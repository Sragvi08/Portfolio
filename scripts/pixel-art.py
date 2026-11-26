"""Draw the Vault's pixel icons, cartridge covers, and ambient cloud layers."""
from pathlib import Path
from random import Random
from PIL import Image, ImageDraw

DEST = Path(__file__).resolve().parents[1] / "dist/assets"
ink = "#51305f"
pink = "#efa9cf"
lav = "#b69be7"
gold = "#ffdfa0"
cream = "#fff4de"
mint = "#bce8d4"
white = "#fff8fc"

def icon(name):
    image = Image.new("RGBA", (32, 32))
    d = ImageDraw.Draw(image)
    def box(coords, fill, edge=ink, width=1):
        d.rectangle(coords, fill=fill, outline=edge, width=width)
    def poly(points, fill, edge=ink):
        d.polygon(points, fill=fill, outline=edge)
    def line(points, color=ink, width=1):
        d.line(points, fill=color, width=width)
    if name == "saturn":
        d.ellipse((6,5,25,24), fill=lav, outline=ink, width=2)
        d.ellipse((9,7,17,13), fill="#e5c4f7")
        poly([(1,19),(6,16),(9,17),(6,20),(11,20),(20,17),(26,13),(24,12),(27,11),(31,12),(31,16),(26,20),(13,25),(4,25),(1,23)], gold)
        line([(5,22),(12,22),(22,18),(28,14)], cream)
    elif name == "projects":
        poly([(2,9),(4,7),(11,7),(15,11),(28,11),(30,14),(29,26),(2,26)], gold)
        box((4,14,28,24),"#efbb71","#fff0b9")
        box((15,17,25,20),cream,None)
    elif name in {"profile","game"}:
        poly([(5,11),(10,8),(22,8),(27,11),(30,22),(28,25),(24,25),(19,21),(13,21),(8,25),(4,25),(2,22)], pink)
        box((8,12,10,19),ink,None); box((6,14,12,16),ink,None)
        box((21,12,23,14),white,None); box((24,16,26,18),ink,None)
    elif name == "chest":
        poly([(4,12),(6,4),(24,4),(29,11),(29,16),(4,16)], lav)
        box((8,7,24,11),"#704783",gold)
        box((3,15,28,20),ink,gold)
        poly([(3,18),(28,18),(26,28),(6,28)],lav)
        box((13,18,19,23),gold)
        box((15,20,16,21),ink,None)
    elif name == "inventory":
        poly([(5,10),(9,6),(23,6),(27,10),(29,25),(26,28),(5,28),(3,25)], lav)
        box((6,13,26,16),gold); box((12,15,20,22),gold)
        box((15,17,17,20),ink,None)
        box((8,8,12,9),cream,None)
    elif name in {"hall","medal","cup","certificate"}:
        if name == "medal":
            poly([(8,3),(15,3),(18,15),(11,18)],pink); poly([(17,15),(21,3),(27,3),(22,18)],lav)
            d.ellipse((7,12,25,29),fill=gold,outline=ink,width=2)
            poly([(16,15),(18,19),(23,20),(19,23),(20,26),(16,24),(12,26),(13,22),(10,20),(14,19)],cream,None)
        elif name == "certificate":
            box((5,4,26,26),cream); box((9,8,22,10),lav,None); box((9,13,21,14),pink,None)
            poly([(17,18),(22,16),(26,19),(24,22),(25,29),(21,27),(18,29),(19,23)],gold)
        else:
            box((2,7,29,14),gold); box((4,9,27,11),"#c58b63",None)
            poly([(7,4),(25,4),(25,14),(21,19),(18,19),(18,24),(23,24),(24,28),(8,28),(9,24),(14,24),(14,19),(11,19),(7,14)],gold)
            box((10,6,12,13),cream,None); box((11,25,21,26),"#cb916a",None)
    elif name in {"lab","flask"}:
        poly([(11,3),(21,3),(21,6),(19,7),(19,14),(27,24),(27,27),(5,27),(5,24),(13,14),(13,7),(11,6)],white)
        poly([(12,18),(18,18),(24,23),(24,25),(8,25)],lav,None)
        box((15,20,17,22),cream,None); box((17,13,19,15),mint,None)
    elif name in {"notes","resume","book"}:
        poly([(6,3),(21,3),(27,9),(27,29),(6,29)],pink if name=="book" else white)
        poly([(21,3),(21,9),(27,9)],lav)
        for y in (12,17,22): line([(10,y),(23,y)],lav,2)
        if name=="book":
            poly([(15,9),(18,13),(17,16),(22,14),(23,20),(20,25),(13,25),(10,21),(12,16),(14,18)],gold)
    elif name in {"terminal","brain","scanner","server","robot","network"}:
        box((3,6,28,24),ink,ink,2); box((6,9,25,21),"#684273" if name=="terminal" else lav, "#e8c9fa")
        box((13,24,18,26),ink); box((8,27,23,28),ink)
        if name in {"terminal","server"}:
            line([(9,12),(13,15),(9,18)],mint,2); line([(16,18),(22,18)],mint,2)
        elif name=="brain":
            line([(7,16),(11,16),(13,11),(16,19),(19,13),(21,16),(24,16)],white,2)
        elif name=="robot":
            box((9,12,12,15),ink); box((19,12,22,15),ink); box((12,18,19,19),mint,None)
            line([(16,6),(16,3)],ink,2); box((14,2,18,4),pink)
        elif name=="scanner":
            box((11,11,18,17),cream); line([(18,17),(22,20)],ink,2)
        else:
            line([(8,17),(15,12),(22,17)],ink,2); box((13,10,17,14),mint); box((7,16,10,19),pink); box((20,16,23,19),pink)
    elif name in {"stars","star"}:
        poly([(16,2),(19,11),(29,11),(22,18),(24,28),(16,23),(8,28),(10,18),(3,11),(13,11)],gold)
        line([(16,6),(14,13),(8,13)],cream,2)
    elif name in {"contact","mail"}:
        box((3,8,29,24),pink,ink,2)
        poly([(4,9),(28,9),(16,18)],cream)
        box((14,16,18,19),lav,ink)
    elif name=="settings":
        poly([(12,3),(20,3),(21,8),(26,7),(29,14),(25,17),(28,22),(22,27),(18,24),(14,29),(8,26),(9,21),(3,19),(3,12),(8,10),(7,6)],lav)
        d.ellipse((11,10,21,21),fill=white,outline=ink,width=2)
    elif name=="moon":
        d.ellipse((5,3,27,28),fill=gold,outline=ink,width=2)
        d.ellipse((15,0,30,19),fill=(0,0,0,0))
        line([(19,4),(16,7),(16,13),(21,18),(26,18)],ink,1)
    elif name=="arena":
        d.ellipse((2,9,29,25),fill=pink,outline=ink,width=2)
        d.ellipse((5,6,27,21),fill=gold,outline=ink,width=2)
        d.ellipse((9,10,23,17),fill="#ab6da3",outline=ink)
        for x in (7,13,19,25): line([(x,20),(x,23)],ink)
    elif name=="quick":
        box((5,4,27,27),white,ink,2); box((6,5,26,10),lav,None)
        box((9,14,14,22),pink,None); line([(17,15),(23,15)],ink); line([(17,19),(23,19)],ink)
    else:
        raise ValueError(name)
    image.save(DEST / f"icon-{name}.png")
    return image

for name in ("saturn projects profile game inventory chest hall medal cup certificate lab flask notes resume book terminal brain scanner server robot network stars star contact mail settings moon arena quick").split():
    icon(name)

covers = {
    "book":("#37264f","#b178ad"), "arena":("#542d52","#d3899a"), "robot":("#2c385c","#8d9cd7"),
    "scanner":("#403361","#a384c3"), "server":("#303550","#8396bc"), "network":("#39455f","#8cbba9"),
}
for name,(dark,light) in covers.items():
    im=Image.new("RGB",(104,62),dark)
    d=ImageDraw.Draw(im)
    d.rectangle((0,0,103,61), outline=light,width=2)
    if name == "book":
        # Engraved leather book, gilt pages, ribbon bookmark.
        d.ellipse((17,4,87,58), fill="#754b84")
        d.polygon([(34,14),(67,9),(75,13),(75,46),(42,53),(32,46)],fill="#603467",outline="#d994b9")
        d.polygon([(38,43),(72,37),(72,46),(41,53),(34,48)],fill="#f1cb9b",outline="#4d2c51")
        d.line((40,46,70,40),fill="#c89075",width=2)
        d.polygon([(33,14),(66,8),(73,12),(72,42),(40,49),(33,44)],fill="#a96bab",outline="#f4b3db")
        d.line((40,16,40,44),fill="#6c487b",width=2)
        d.polygon([(55,19),(61,27),(59,30),(64,28),(63,36),(57,39),(51,37),(48,32),(52,27),(52,32)],fill="#ffcf90",outline="#b4698b")
        d.polygon([(61,44),(65,43),(65,54),(62,52),(60,55)],fill="#eb86aa")
    elif name == "arena":
        # An isometric arena with an ochre stage and tiered seating.
        d.rectangle((2,4,101,23), fill="#814b7a")
        for x,y in [(7,17),(16,11),(24,20),(76,17),(87,9),(96,19)]:
            d.rectangle((x,y,x+5,49),fill="#ac668b")
        d.ellipse((12,17,91,56),fill="#a6709b",outline="#f2a9b0",width=2)
        d.ellipse((15,11,88,47),fill="#dbc091",outline="#623b64",width=2)
        d.ellipse((22,17,81,40),fill="#a35e82",outline="#fff0bd",width=2)
        d.ellipse((31,22,72,36),fill="#d8968f",outline="#683654")
        for x in (23,34,46,58,70,80):
            d.line((x,46,x+1,51),fill="#573550",width=2)
        for x,y in [(12,13),(90,14)]:
            d.line((x,y,x,42),fill="#fed69f",width=2)
            d.polygon([(x,y),(x+8,y+4),(x,y+7)],fill="#f09bbd")
    elif name == "robot":
        # Knowledge processor with one answer sheet fed through its side.
        d.rectangle((2,39,101,60),fill="#4c4a79")
        for x in (8,22,76,91):
            d.line((x,59,x,32,52,32),fill="#7167a4")
        d.rectangle((29,18,69,44),fill="#9889d1",outline="#cfbaf6",width=2)
        d.rectangle((36,24,62,38),fill="#39355d",outline="#64568b")
        d.rectangle((40,28,45,32),fill=mint)
        d.rectangle((53,28,58,32),fill=mint)
        d.line((46,35,52,35),fill="#f2badb",width=2)
        d.line((50,18,50,11),fill="#e5b7f0",width=2)
        d.rectangle((47,8,53,12),fill=gold)
        for x in (34,59):
            d.rectangle((x,45,x+7,51),fill="#c1a7e9")
        d.polygon([(72,34),(85,30),(91,43),(77,47)],fill="#f8efd8",outline="#8c7499")
        for y in (35,39,43): d.line((76,y,83,y-2),fill="#9f7bbb")
    else:
        # Individual equipment labels share the same cartridge dimensions.
        d.rectangle((2,42,101,60),fill=light)
        for x in range(6,101,6):
            d.line((x,59,52+(x-52)//3,42),fill=dark)
        d.rectangle((27,5,76,52), fill=dark, outline=light, width=1)
        glyph=icon(name).resize((44,44),Image.Resampling.NEAREST)
        im.paste(glyph,(30,6),glyph)
        for x,y in [(12,18),(85,19),(12,33),(85,34)]:
            d.rectangle((x,y,x+6,y+2),fill=light)
    im.save(DEST / f"cover-{name}.png")

for index, color in enumerate(("#f9d7eb","#dfc6f5")):
    im=Image.new("RGBA",(240,62))
    d=ImageDraw.Draw(im)
    rng=Random(80+index)
    for x in range(12,217,12):
        width=rng.randint(18,42)
        height=rng.randint(9,25)
        y=42-height
        d.rounded_rectangle((x,y,x+width,50), radius=height//2, fill=color)
        d.rectangle((x+5,45,x+width-3,51), fill=color)
    im=im.resize((120,31),Image.Resampling.NEAREST)
    im.save(DEST/f"cloud-{index}.png")
