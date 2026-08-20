"""Crop Bang Sob mascot: remove credits/logo, make white transparent."""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image

SRC = Path(
    r"C:\Users\admin\.cursor\projects\d-Raza-App-project-bms\assets"
    r"\c__Users_admin_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"533ccf57d06c781635787849cfc182fe_images_image-02c3ead3-b868-40a8-9b9e-9f567a7d72da.png"
)
OUT = Path(r"d:\Raza\App\project-bms\jkt-web\public\assets\prototype\jaro-mascot.png")


def row_nw(arr: np.ndarray, y: int, thresh: int = 245) -> float:
    row = arr[y, :, :3]
    return float(((row[:, 0] < thresh) | (row[:, 1] < thresh) | (row[:, 2] < thresh)).mean())


def main() -> None:
    arr = np.asarray(Image.open(SRC).convert("RGBA")).copy()
    h, w = arr.shape[:2]
    dens = np.array([row_nw(arr, y) for y in range(h)])

    # Character starts after the credit/rule band: first sustained dense region
    # below y=80 (source layout: rule ~40, character ~128).
    char_top = None
    for y in range(90, int(h * 0.5)):
        if dens[y] > 0.04 and dens[min(h - 1, y + 8)] > 0.04:
            char_top = y
            break
    if char_top is None:
        raise SystemExit("could not find character top")

    # Logo: last dense band above bottom; gap above logo is near-empty.
    # Feet end where density collapses to near-zero before logo resumes.
    char_bottom = None
    for y in range(char_top + 50, h - 20):
        # empty gap of >=8 rows, then logo density returns
        if dens[y] < 0.015:
            gap_len = 0
            yy = y
            while yy < h and dens[yy] < 0.015:
                gap_len += 1
                yy += 1
            if gap_len >= 6 and yy < h and dens[yy] > 0.05:
                char_bottom = y  # exclusive: first empty row
                break
    if char_bottom is None:
        # fallback: last high-density row in mid section
        mid = dens[char_top : int(h * 0.85)]
        char_bottom = char_top + int(np.where(mid > 0.05)[0].max()) + 1

    print(f"size={w}x{h} char_top={char_top} char_bottom={char_bottom}")
    cropped = arr[char_top:char_bottom].copy()

    rgb = cropped[:, :, :3].astype(np.int16)
    minc = rgb.min(axis=2)
    maxc = rgb.max(axis=2)
    sat = maxc - minc
    near_white = (minc >= 242) & (sat <= 18)
    soft_white = (minc >= 228) & (sat <= 28) & ~near_white
    alpha = cropped[:, :, 3].astype(np.float32)
    alpha[near_white] = 0
    alpha[soft_white] *= 0.25
    cropped[:, :, 3] = np.clip(alpha, 0, 255).astype(np.uint8)

    ys, xs = np.where(cropped[:, :, 3] > 16)
    pad = 6
    x0, x1 = max(0, int(xs.min()) - pad), min(cropped.shape[1], int(xs.max()) + 1 + pad)
    y0, y1 = max(0, int(ys.min()) - pad), min(cropped.shape[0], int(ys.max()) + 1 + pad)
    out = Image.fromarray(cropped[y0:y1, x0:x1], "RGBA")
    out.save(OUT, optimize=True)
    print(f"wrote {OUT} size={out.size}")


if __name__ == "__main__":
    main()
