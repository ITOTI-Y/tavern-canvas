# /// script
# requires-python = ">=3.12"
# dependencies = [
#   "polars>=1.43",
#   "pyarrow>=18",
#   "typer>=0.15",
# ]
# ///
"""Counts non-deleted posts per tag in the u-haru/danbooru-tags-20260518 dataset.

The output is the popularity overlay consumed by `import_hf_tags.ts` and
`merge_sources.ts`. Download the parquet shards from
https://huggingface.co/datasets/u-haru/danbooru-tags-20260518/tree/main/data,
then run from the repository root:

    uv run tools/vocabulary_source/scripts/aggregate_fresh_popularity.py \
        --input-dir /path/to/u-haru-parquet \
        --output /path/to/output/counts.jsonl

Posts with `is_deleted` set are excluded, matching Danbooru's own
`post_count`; banned and pending posts are counted.
"""

from pathlib import Path
from typing import Annotated, Final

import polars as pl
import typer

PARQUET_GLOB: Final = "*.parquet"


def aggregate_tag_post_counts(shard_paths: list[Path]) -> pl.DataFrame:
    """Counts, per tag, how many non-deleted posts carry it.

    Args:
        shard_paths: Parquet shards of the dataset.

    Returns:
        A `tag`/`post_count` frame sorted by `post_count` descending, then
        `tag` ascending, so repeated runs produce identical output.
    """
    return (
        pl.scan_parquet(shard_paths)
        .select(["tag_string", "is_deleted"])
        .filter(~pl.col("is_deleted"))
        .select(pl.col("tag_string").str.split(" ").alias("tag"))
        .explode("tag")
        .filter(pl.col("tag") != "")
        .group_by("tag")
        .agg(pl.len().alias("post_count"))
        .sort(["post_count", "tag"], descending=[True, False])
        .collect(engine="streaming")
    )


def main(
    input_dir: Annotated[
        Path,
        typer.Option(exists=True, file_okay=False, help="Directory of parquet shards."),
    ],
    output: Annotated[Path, typer.Option(help="Path of the counts JSONL to write.")],
) -> None:
    shard_paths = sorted(input_dir.glob(PARQUET_GLOB))
    if not shard_paths:
        raise FileNotFoundError(f"no {PARQUET_GLOB} files found under {input_dir}")

    counts = aggregate_tag_post_counts(shard_paths)
    output.parent.mkdir(parents=True, exist_ok=True)
    counts.write_ndjson(output)
    typer.echo(
        f"scanned {len(shard_paths)} shards, wrote {counts.height} tag counts to {output}",
        err=True,
    )


if __name__ == "__main__":
    typer.run(main)
