"""Extract isolated character artwork from the two revised handoff sheets."""
import sys
from pathlib import Path
from PIL import Image
import numpy as np
from scipy import ndimage as ndi

source = Path(sys.argv[1])
assets = Path(__file__).resolve().parents[1] / "dist/assets"
portraits = Image.open(source / "04-revised-player-profile.png").convert("RGB")
dragons = Image.open(source / "05-revised-lil-mochi.png").convert("RGB")

def sprite(sheet, box, name, size):
    crop = sheet.crop(box)
    rgb = np.array(crop)
    border = np.max(rgb, axis=2) < 135
    if name == "portrait":
        border[543:547, 34:458] = True
    border = ndi.binary_closing(np.pad(border, 6), iterations=3)
    filled = ndi.binary_fill_holes(border)[6:-6, 6:-6]
    labels, _ = ndi.label(filled)
    frequencies = np.bincount(labels.ravel())
    frequencies[0] = 0
    alpha = Image.fromarray((labels == frequencies.argmax()).astype("uint8") * 255)
    crop.putalpha(alpha)
    crop = crop.crop(alpha.getbbox())
    crop.thumbnail(size, Image.Resampling.NEAREST)
    crop.save(assets / (name + ".png"))

sprite(portraits, (35,299,518,853), "portrait", (230,260))
sprite(portraits, (510,250,720,855), "player-sprite", (90,210))
for name, box in {
    "awake":(525,423,752,692), "sleep":(55,860,242,978),
    "fly":(267,789,464,961), "happy":(482,806,661,983),
    "collect":(696,824,826,981),
}.items():
    sprite(dragons, box, "mochi-"+name, (190,160))
