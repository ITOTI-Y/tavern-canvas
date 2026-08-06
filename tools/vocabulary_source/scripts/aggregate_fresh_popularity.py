# /// script
# requires-python = ">=3.12"
# dependencies = [
#   "polars>=1.43",
#   "pyarrow>=18",
#   "typer>=0.15",
# ]
# ///
"""Aggregates per-post tag strings from u-haru/danbooru-tags-20260518 into
per-tag post counts, for overlay onto the (stale) JayxMay95/qdlabs tag
universe (see import_hf_tags.ts and merge_sources.ts's popularity-overlay
input).

Reproduce (from repo root, after downloading the 115 parquet shards from
https://huggingface.co/datasets/u-haru/danbooru-tags-20260518/tree/main/data
into some local directory with `hf download` or authenticated curl):

    uv run tools/vocabulary_source/scripts/aggregate_fresh_popularity.py \
        --input-dir /path/to/u-haru-parquet \
        --output /path/to/output/counts.jsonl

A post counts toward a tag's popularity only when `is_deleted` is false,
matching Danbooru's own tag post_count semantics (deleted posts are excluded
from search and do not count). `is_banned`/`is_pending` posts are still
counted -- a ban restricts visibility, it does not delete the post.
"""

from pathlib import Path
from typing import Final

import polars as pl
import typer

PARQUET_GLOB: Final = "*.parquet"


def aggregate_tag_post_counts(input_dir: Path) -> pl.DataFrame:
    """Scans every parquet shard under `input_dir` and counts, per tag, how
    many non-deleted posts carry it.

    Args:
        input_dir: Directory holding the dataset's `*.parquet` shards.

    Returns:
        A `tag`/`post_count` DataFrame, sorted by post_count descending then
        tag ascending (deterministic, reproducible byte-for-byte across
        runs).

    Raises:
        FileNotFoundError: If `input_dir` has no `*.parquet` files.
    """
    shard_paths = sorted(input_dir.glob(PARQUET_GLOB))
    if not shard_paths:
        raise FileNotFoundError(f"no {PARQUET_GLOB} files found under {input_dir}")

    lazy_frame = (
        pl.scan_parquet(shard_paths)
        .select(["tag_string", "is_deleted"])
        .filter(~pl.col("is_deleted"))
        .with_columns(pl.col("tag_string").str.split(" ").alias("tag"))
        .select("tag")
        .explode("tag")
        .filter(pl.col("tag") != "")
        .group_by("tag")
        .agg(pl.len().alias("post_count"))
        .sort(["post_count", "tag"], descending=[True, False])
    )
    return lazy_frame.collect(engine="streaming")


def main(
    input_dir: Path = typer.Option(  # noqa: B008
        ...,
        "--input-dir",
        exists=True,
        file_okay=False,
        help="Directory of u-haru parquet shards.",
    ),
    output: Path = typer.Option(  # noqa: B008
        ..., "--output", help="Path to write the counts JSONL to."
    ),
) -> None:
    counts = aggregate_tag_post_counts(input_dir)
    output.parent.mkdir(parents=True, exist_ok=True)
    counts.write_ndjson(output)
    typer.echo(
        f"aggregate_fresh_popularity: scanned {len(sorted(input_dir.glob(PARQUET_GLOB)))} shards, "
        f"wrote {counts.height} tag counts to {output}",
        err=True,
    )


if __name__ == "__main__":
    typer.run(main)
