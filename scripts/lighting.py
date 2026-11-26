"""Generate lighting variants and wallpaper downloads from the original landscape."""
from pathlib import Path
from PIL import Image, ImageOps
import numpy as np

assets = Path(__file__).resolve().parents[1] / "dist/assets"
base = Image.open(assets.parents[1] / "artwork/landscape-master.png").convert("RGB")
sky = np.asarray(base).astype(float)
grades = {
    "dawn": ((1.02, .92, .88), (14, 4, 7)),
    "daylight": ((.94, 1.03, 1.02), (12, 15, 7)),
    "twilight": ((.93, .88, .95), (8, 5, 8)),
    "moonlight": ((.73, .72, .94), (0, 0, 18)),
}
for phase, (scale, lift) in grades.items():
    image = Image.fromarray(np.clip(sky * scale + lift, 0, 255).astype("uint8"))
    image.save(assets / f"landscape-{phase}.webp", quality=89, method=6)
    if phase == "moonlight":
        image.resize((1920,1080), Image.Resampling.NEAREST).save(assets / "celestial-wallpaper.png", optimize=True)
        ImageOps.fit(image, (1080,1920), method=Image.Resampling.NEAREST, centering=(.84,.5)).save(assets / "celestial-wallpaper-phone.png", optimize=True)
