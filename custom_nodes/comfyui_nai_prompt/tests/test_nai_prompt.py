import pytest

from nai_prompt import convert


@pytest.mark.parametrize(
    ("prompt", "expected"),
    [
        ("1girl, solo", "1girl, solo"),
        ("{red hair}, smile", "(red hair:1.05), smile"),
        ("{{red hair}}", "(red hair:1.1025)"),
        ("[blush]", "(blush:0.9524)"),
        ("1.5::red hair::, smile", "(red hair:1.5), smile"),
        ("-1::hat::, 1girl", "(hat:-1), 1girl"),
        ("{1.5::red hair::}", "(red hair:1.575)"),
        ("1.2::score_7, masterpiece::", "(score_7, masterpiece:1.2)"),
        ("{unclosed, tail", "(unclosed, tail:1.05)"),
        ("stray}, tag]", "stray, tag"),
        ("artist (name), {smile}", r"artist \(name\), (smile:1.05)"),
        ("a::b", "ab"),
    ],
)
def test_convert(prompt: str, expected: str) -> None:
    assert convert(prompt) == expected
