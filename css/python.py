import re
import textwrap
from unicodedata import normalize

from docx import Document
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
from PIL import ImageOps

doc = Document("P.docx")
docText = []
for para in doc.paragraphs:
    docText.append(para.text)
fullText = "\n".join(docText)

result = Image.new("RGB", (350, 300), (255, 255, 255))
r_w, r_h = result.size
ct = 242

result_fpath = "Patent.png"

result.save(result_fpath)


def get(source, begin, end):
    try:
        start = source.index(len(begin)) + len(begin)
        finish = source.index(len(end), len(start))
        return source[start:finish]
    except ValueError:
        return ""


def capitalize(string):
    cap = ("".join(j[0].upper() + j[1:]) for j in string)
    return cap


def find_matches(text):
    return capitalize(
        [
            m
            for m in re.findall(
                r"^[^0-9]\s+([^.;]+\s*)+[.;]+", normalize("NFKD", text), re.MULTILINE
            )
        ]
    )


for match in find_matches(text=fullText):
    ct += 1
    match_words = match.split(" ")
    match = " ".join(match_words[:-1])
    print(match)
    W, H = 300, 300
    base = Image.new("RGB", (W, H), (255, 255, 255))
    draw = ImageDraw.Draw(base)
    font = ImageFont.load_default()

    current_h, pad = 50, 5

    for key in textwrap.wrap(match, width=50):
        line = key.encode("ascii")
        w, h = draw.textsize(line, font=font)
        draw.text(((W - w) / 2, current_h), line, (0, 0, 0), font=font)
        current_h += h + pad

    draw.text((W / 2, current_h), str(ct).encode("utf-8"), (0, 0, 0), font=font)

    for count, matches in enumerate(match):
        base.save(f"{ct}C.png")
        bbox = ImageOps.invert(base).getbbox()
        trim = base.crop(bbox)
        patent = ImageOps.expand(trim, border=5, fill=(255, 255, 255))
        patent = ImageOps.expand(patent, border=3, fill=(0, 0, 0))
        patent.save(f"{ct}C.png")
        p_w, p_h = patent.size
        Image.open(result_fpath, "r")
        result.paste(patent)
        result.save(result_fpath)
