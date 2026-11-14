# /// script
# requires-python = ">=3.12"
# dependencies = [
#   "huggingface-hub>=2.4,<3",
#   "loguru>=0.7",
#   "typer>=0.15",
# ]
# ///
"""Reads and publishes the vocabulary data kept in the Hugging Face dataset.

The dataset holds the living source records (`data/tags.jsonl`), the translation
memory (`data/translations.jsonl`), the report of the last release
(`data/report.json`), the catalog and one directory per package version. Run
from the repository root, with `HF_TOKEN` set for a private dataset:

    uv run tools/vocabulary_source/scripts/hf_dataset.py download \\
        --repo owner/name --out-dir work/published
"""

import json
import os
import re
import shutil
from pathlib import Path
from typing import Annotated, Final

import typer
from huggingface_hub import (
    CommitOperationAdd,
    CommitOperationDelete,
    HfApi,
    hf_hub_download,
)
from loguru import logger

DATA_FILES: Final = (
    "catalog.json",
    "data/tags.jsonl",
    "data/translations.jsonl",
    "data/report.json",
)
REPO_TYPE: Final = "dataset"
PUBLISHED_FILES: Final = ("manifest.json", "pack.bin")
MAX_SHRINK_RATIO: Final = 0.05

app = typer.Typer(no_args_is_help=True)


def _api() -> HfApi:
    return HfApi(token=os.environ.get("HF_TOKEN"))


def _write_output(name: str, value: str) -> None:
    output = os.environ.get("GITHUB_OUTPUT")
    if output is not None:
        with Path(output).open("a", encoding="utf-8") as handle:
            handle.write(f"{name}={value}\n")


@app.command()
def download(
    repo: Annotated[str, typer.Option()],
    out_dir: Annotated[Path, typer.Option()],
) -> None:
    """Copies the published data files that exist into `out_dir`."""
    present = set(_api().list_repo_files(repo, repo_type=REPO_TYPE))
    for name in DATA_FILES:
        if name not in present:
            logger.info("{} is not published yet", name)
            continue
        cached = hf_hub_download(
            repo, name, repo_type=REPO_TYPE, token=os.environ.get("HF_TOKEN")
        )
        target = out_dir / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(cached, target)
        logger.info("downloaded {}", name)


@app.command()
def check(
    report: Annotated[Path, typer.Option()],
    previous_report: Annotated[Path, typer.Option()],
    summary: Annotated[Path | None, typer.Option()] = None,
) -> None:
    """Fails on a shrunken release and reports whether the records changed.

    Raises:
        typer.Exit: When the refresh lost more than 5% of the eligible records,
            which points to a truncated fetch rather than real deletions.
    """
    current = json.loads(report.read_text(encoding="utf-8"))
    previous_hash = (
        json.loads(previous_report.read_text(encoding="utf-8"))["records_sha256"]
        if previous_report.exists()
        else None
    )
    changed = current["records_sha256"] != previous_hash
    _write_output("changed", "true" if changed else "false")

    rows = "\n".join(
        f"| {key} | {value} |"
        for key, value in current.items()
        if not isinstance(value, list)
    )
    samples = "\n".join(
        f"- {key}: {', '.join(value) or '(none)'}"
        for key, value in current.items()
        if isinstance(value, list)
    )
    text = (
        f"## Vocabulary refresh\n\nchanged: {changed}\n\n| field | value |\n|---|---|\n"
        f"{rows}\n\n{samples}\n"
    )
    if summary is not None:
        with summary.open("a", encoding="utf-8") as handle:
            handle.write(text)
    logger.info("records changed: {}", changed)

    eligible = current["previous_eligible_count"]
    if eligible > 0 and current["record_count"] < eligible * (1 - MAX_SHRINK_RATIO):
        logger.error(
            "{} records against {} eligible before; refusing to publish",
            current["record_count"],
            eligible,
        )
        raise typer.Exit(code=1)


@app.command()
def publish(
    repo: Annotated[str, typer.Option()],
    package_id: Annotated[str, typer.Option()],
    version: Annotated[str, typer.Option()],
    package_dir: Annotated[Path, typer.Option()],
    catalog: Annotated[Path, typer.Option()],
    tags: Annotated[Path, typer.Option()],
    translations: Annotated[Path, typer.Option()],
    report: Annotated[Path, typer.Option()],
) -> None:
    """Uploads one package version with its catalog and data in a single commit.

    The previous version's directory stays until the next release, so a client
    that read the old catalog can still finish its install.
    """
    api = _api()
    root = f"packages/{package_id}/"
    old_catalog = json.loads(
        Path(
            hf_hub_download(
                repo,
                "catalog.json",
                repo_type=REPO_TYPE,
                token=os.environ.get("HF_TOKEN"),
            )
        ).read_text(encoding="utf-8")
    )
    old_base = next(
        (
            entry["base_url"]
            for entry in old_catalog
            if entry["package_id"] == package_id and entry["base_url"]
        ),
        "",
    )
    previous = re.search(rf"/{re.escape(root)}([^/]+)/$", old_base)
    keep = {f"{root}{version}/"} | (
        {f"{root}{previous.group(1)}/"} if previous else set()
    )
    stale = [
        path
        for path in api.list_repo_files(repo, repo_type=REPO_TYPE)
        if path.startswith(root) and not any(path.startswith(kept) for kept in keep)
    ]

    operations: list[CommitOperationAdd | CommitOperationDelete] = [
        CommitOperationAdd(
            path_in_repo=f"{root}{version}/{name}", path_or_fileobj=package_dir / name
        )
        for name in PUBLISHED_FILES
    ]
    operations += [
        CommitOperationAdd(path_in_repo="catalog.json", path_or_fileobj=catalog),
        CommitOperationAdd(path_in_repo="data/tags.jsonl", path_or_fileobj=tags),
        CommitOperationAdd(
            path_in_repo="data/translations.jsonl", path_or_fileobj=translations
        ),
        CommitOperationAdd(path_in_repo="data/report.json", path_or_fileobj=report),
    ]
    operations += [CommitOperationDelete(path_in_repo=path) for path in stale]
    commit = api.create_commit(
        repo,
        operations,
        commit_message=f"vocabulary {package_id} {version}",
        repo_type=REPO_TYPE,
    )
    logger.info(
        "published {} {} ({} stale files removed): {}",
        package_id,
        version,
        len(stale),
        commit.commit_url,
    )


if __name__ == "__main__":
    app()
