#!/usr/bin/env python3
"""Rasterize the frozen ICON (IMG_3780) to PNG. Cream on ink. No Ember."""

from __future__ import annotations

import math
import struct
import zlib
from pathlib import Path

INK = (0x0C, 0x0C, 0x0C, 255)
CREAM = (0xF0, 0xEC, 0xE4, 255)
# Super-sample so the 32 tab icon and 180 home-screen icon stay crisp.
SS = 4


def png_bytes(width: int, height: int, pixels: list[list[tuple[int, int, int, int]]]) -> bytes:
    def chunk(tag: bytes, data: bytes) -> bytes:
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    raw = b"".join(b"\x00" + bytes(c for px in row for c in px) for row in pixels)
    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )


def blend(dst: tuple[int, int, int, int], src: tuple[int, int, int, int], a: float) -> tuple[int, int, int, int]:
    a = max(0.0, min(1.0, a))
    return tuple(int(d + (s - d) * a) for d, s in zip(dst, src))  # type: ignore[return-value]


def paint_line(
    grid: list[list[tuple[int, int, int, int]]],
    x0: float,
    y0: float,
    x1: float,
    y1: float,
    width: float,
    color: tuple[int, int, int, int],
) -> None:
    h = len(grid)
    w = len(grid[0])
    dx, dy = x1 - x0, y1 - y0
    length = math.hypot(dx, dy) or 1.0
    nx, ny = -dy / length, dx / length
    half = width / 2
    steps = int(length * 4) + 1
    for i in range(steps + 1):
        t = i / steps
        cx, cy = x0 + dx * t, y0 + dy * t
        for ox in range(-int(half + 2), int(half + 3)):
            for oy in range(-int(half + 2), int(half + 3)):
                x, y = int(round(cx + ox)), int(round(cy + oy))
                if 0 <= x < w and 0 <= y < h:
                    px, py = x + 0.5 - cx, y + 0.5 - cy
                    along = px * (dx / length) + py * (dy / length)
                    across = abs(px * nx + py * ny)
                    if -1 <= along <= length + 1 and across <= half + 0.6:
                        cover = max(0.0, 1.0 - max(0.0, across - half))
                        grid[y][x] = blend(grid[y][x], color, cover)


def paint_circle(
    grid: list[list[tuple[int, int, int, int]]],
    cx: float,
    cy: float,
    r: float,
    color: tuple[int, int, int, int],
) -> None:
    h = len(grid)
    w = len(grid[0])
    for y in range(int(cy - r - 2), int(cy + r + 3)):
        for x in range(int(cx - r - 2), int(cx + r + 3)):
            if 0 <= x < w and 0 <= y < h:
                d = math.hypot(x + 0.5 - cx, y + 0.5 - cy)
                cover = max(0.0, min(1.0, r + 0.5 - d))
                if cover:
                    grid[y][x] = blend(grid[y][x], color, cover)


def downsample(grid: list[list[tuple[int, int, int, int]]], size: int) -> list[list[tuple[int, int, int, int]]]:
    out: list[list[tuple[int, int, int, int]]] = []
    n = SS * SS
    for y in range(size):
        row: list[tuple[int, int, int, int]] = []
        for x in range(size):
            acc = [0, 0, 0, 0]
            for oy in range(SS):
                for ox in range(SS):
                    px = grid[y * SS + oy][x * SS + ox]
                    acc[0] += px[0]
                    acc[1] += px[1]
                    acc[2] += px[2]
                    acc[3] += px[3]
            row.append((acc[0] // n, acc[1] // n, acc[2] // n, acc[3] // n))
        out.append(row)
    return out


def render(size: int) -> bytes:
    hi = size * SS
    s = hi / 32.0
    grid = [[INK for _ in range(hi)] for _ in range(hi)]
    stroke = 1.5 * s
    paint_line(grid, 9 * s, 27 * s, 16 * s, 5 * s, stroke, CREAM)
    paint_line(grid, 16 * s, 5 * s, 23 * s, 27 * s, stroke, CREAM)
    paint_line(grid, 4 * s, 22 * s, 28 * s, 22 * s, stroke, CREAM)
    paint_circle(grid, 7 * s, 22 * s, max(1.6 * s, 2.0 * SS), CREAM)
    return png_bytes(size, size, downsample(grid, size))


def main() -> None:
    root = Path(__file__).resolve().parents[1] / "public"
    (root / "favicon-32.png").write_bytes(render(32))
    (root / "apple-touch-icon.png").write_bytes(render(180))


if __name__ == "__main__":
    main()
