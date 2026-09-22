from pathlib import Path
import shutil

from PIL import Image
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "keith-lee-partnership-media-kit.pdf"
PUBLIC = ROOT / "public" / "downloads" / "keith-lee-partnership-media-kit.pdf"
MEDIA = ROOT / "public" / "media"

INK = HexColor("#11100F")
PAPER = HexColor("#FFFDF8")
CREAM = HexColor("#F7F1E7")
PINK = HexColor("#E65484")
BLUSH = HexColor("#EFC8D5")
ORANGE = HexColor("#F26A35")
BERRY = HexColor("#762B53")
MUTED = HexColor("#665F59")
WHITE_60 = Color(1, 1, 1, alpha=0.62)


def words(text, font, size, max_width):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if line and stringWidth(trial, font, size) > max_width:
            lines.append(line)
            line = word
        else:
            line = trial
    if line:
        lines.append(line)
    return lines


def paragraph(c, text, x, y, width, font="Helvetica", size=10.5, leading=15, color=MUTED, max_lines=None):
    c.setFillColor(color)
    c.setFont(font, size)
    lines = words(text, font, size, width)
    if max_lines:
        lines = lines[:max_lines]
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def image_cover(c, path, x, y, width, height, radius=16, focus_y=0.5):
    with Image.open(path) as im:
        iw, ih = im.size
    scale = max(width / iw, height / ih)
    dw, dh = iw * scale, ih * scale
    dx = x + (width - dw) / 2
    dy = y + (height - dh) * focus_y
    c.saveState()
    clip = c.beginPath()
    clip.roundRect(x, y, width, height, radius)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(str(path), dx, dy, dw, dh, preserveAspectRatio=True, mask="auto")
    c.restoreState()


def top_label(c, text, x, y, color=PINK):
    c.setFillColor(color)
    c.circle(x + 3, y + 3, 3, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(x + 14, y, text.upper())


def footer(c, page):
    c.setStrokeColor(Color(0.07, 0.06, 0.06, alpha=0.15))
    c.line(42, 34, 570, 34)
    c.setFont("Helvetica", 7.5)
    c.setFillColor(MUTED)
    c.drawString(42, 20, "KEITH LEE - PUBLIC PARTNERSHIP MEDIA KIT")
    c.drawRightString(570, 20, f"{page:02d}")


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=letter)
    c.setTitle("Keith Lee - Public Partnership Media Kit")
    c.setAuthor("Keith Lee Partnership Platform")
    c.setSubject("Public partnership, media, and speaking overview")

    c.setFillColor(INK)
    c.rect(0, 0, 612, 792, fill=1, stroke=0)
    c.setFillColor(PINK)
    c.rect(0, 776, 612, 16, fill=1, stroke=0)
    image_cover(c, MEDIA / "keith-event.webp", 306, 62, 264, 668, radius=24)
    c.setFillColor(ORANGE)
    c.roundRect(282, 615, 48, 48, 14, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(306, 632, "KL")
    top_label(c, "Public partnership media kit", 42, 704, BLUSH)
    c.setFillColor(PAPER)
    c.setFont("Helvetica-Bold", 52)
    c.drawString(42, 626, "KEITH")
    c.drawString(42, 574, "LEE")
    c.setFillColor(PINK)
    c.setFont("Times-Italic", 24)
    c.drawString(42, 524, "Restaurant stories with")
    c.drawString(42, 496, "cultural reach.")
    paragraph(c, "A selective platform for restaurant, hospitality, destination, media, and live-event opportunities.", 42, 445, 220, size=11.5, leading=17, color=WHITE_60)
    c.setFillColor(PAPER)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(42, 78, "PUBLIC EDITION")
    c.setFillColor(WHITE_60)
    c.setFont("Helvetica", 8)
    c.drawString(42, 62, "September 2026 - Information subject to written approval")
    c.showPage()

    c.setFillColor(CREAM)
    c.rect(0, 0, 612, 792, fill=1, stroke=0)
    top_label(c, "Positioning", 42, 738, ORANGE)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 29)
    c.drawString(42, 688, "A trusted voice")
    c.drawString(42, 656, "at the intersection")
    c.drawString(42, 624, "of food, community,")
    c.drawString(42, 592, "and culture.")
    paragraph(c, "Keith Lee shares direct, accessible food experiences with an audience that values his human approach to restaurant stories.", 42, 554, 286, size=10.5, leading=15)
    image_cover(c, MEDIA / "keith-portrait.jpeg", 360, 538, 210, 206, radius=28)
    c.setFillColor(PAPER)
    c.roundRect(42, 314, 528, 178, 22, fill=1, stroke=0)
    top_label(c, "Partnership principles", 66, 458, PINK)
    principles = [
        ("01", "Credibility first", "Clear terms and truthful context protect audience trust."),
        ("02", "Editorial boundaries", "Paid work never implies guaranteed praise or outcomes."),
        ("03", "Operational readiness", "Restaurants should be prepared for attention, demand, and service pressure."),
    ]
    y = 416
    for number, title, body in principles:
        c.setFillColor(BLUSH)
        c.roundRect(66, y - 8, 30, 30, 10, fill=1, stroke=0)
        c.setFillColor(BERRY)
        c.setFont("Helvetica-Bold", 8)
        c.drawCentredString(81, y + 3, number)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(112, y + 8, title)
        paragraph(c, body, 112, y - 7, 416, size=8.5, leading=12)
        y -= 48
    c.setFillColor(INK)
    c.roundRect(42, 68, 528, 198, 22, fill=1, stroke=0)
    image_cover(c, MEDIA / "keith-brunchaholics.webp", 54, 80, 224, 174, radius=16)
    top_label(c, "The approach", 302, 226, BLUSH)
    paragraph(c, "Each opportunity begins with fit: the story, the partner, the audience value, the logistics, and the disclosure requirements.", 302, 192, 236, font="Helvetica-Bold", size=12, leading=17, color=PAPER)
    paragraph(c, "Commercial interest does not override Keith's point of view or the need for documented, approved claims.", 302, 120, 236, size=9.2, leading=14, color=WHITE_60)
    footer(c, 2)
    c.showPage()

    c.setFillColor(PAPER)
    c.rect(0, 0, 612, 792, fill=1, stroke=0)
    top_label(c, "Ways to work together", 42, 738, PINK)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 30)
    c.drawString(42, 686, "Built for the right kind")
    c.drawString(42, 648, "of opportunity.")
    paragraph(c, "Qualified for brand fit, timing, operational readiness, and audience value before scope.", 390, 682, 180, size=9.2, leading=14)
    formats = [
        ("01", "Restaurant collaboration", "A focused story around a restaurant, menu, or service experience."),
        ("02", "Paid brand partnership", "Selected food, hospitality, or adjacent brand campaigns with clear disclosure."),
        ("03", "Multi-location or franchise", "Coordinated campaigns where local operations can support the attention."),
        ("04", "Tourism and destination", "Food-led narratives for cities, regions, festivals, or visitor campaigns."),
        ("05", "Restaurant campaign", "A defined activation with agreed scope, timing, and approved claims."),
        ("06", "Speaking and live events", "Panels, hosting, festivals, culture conversations, and appearances."),
        ("07", "Long-term ambassador", "Highly selective, values-aligned relationships built for continuity."),
    ]
    positions = [(42, 512), (318, 512), (42, 394), (318, 394), (42, 276), (318, 276), (42, 158)]
    fills = [CREAM, BLUSH, HexColor("#F6B28D"), HexColor("#EADCE8"), CREAM, BLUSH, INK]
    for index, (number, title, body) in enumerate(formats):
        x, y = positions[index]
        card_w = 252 if index < 6 else 528
        fill = fills[index]
        c.setFillColor(fill)
        c.roundRect(x, y, card_w, 104, 18, fill=1, stroke=0)
        fg = PAPER if fill == INK else INK
        sub = WHITE_60 if fill == INK else MUTED
        c.setFillColor(PINK if fill != INK else BLUSH)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(x + 18, y + 78, number)
        c.setFillColor(fg)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(x + 52, y + 76, title)
        paragraph(c, body, x + 18, y + 48, card_w - 36, size=8.3, leading=11.5, color=sub, max_lines=3)
    c.setFillColor(BERRY)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(42, 126, "PUBLIC PRICING IS NOT LISTED")
    paragraph(c, "Proposals follow qualification and depend on scope, usage, travel, timing, and production requirements.", 42, 108, 528, size=8.5, leading=12)
    footer(c, 3)
    c.showPage()

    c.setFillColor(CREAM)
    c.rect(0, 0, 612, 792, fill=1, stroke=0)
    top_label(c, "Impact and evidence", 42, 738, ORANGE)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 34)
    c.drawString(42, 686, "Credibility before claims.")
    paragraph(c, "Impact stories should explain the restaurant context, Keith's involvement, the activation format, the audience response, and only the outcomes that can be documented and approved.", 42, 644, 520, size=10.5, leading=16)
    image_cover(c, MEDIA / "keith-miami.jpg", 42, 360, 252, 228, radius=20)
    image_cover(c, MEDIA / "keith-community.jpeg", 318, 360, 252, 228, radius=20)
    c.setFillColor(PAPER)
    c.roundRect(42, 82, 528, 242, 22, fill=1, stroke=0)
    top_label(c, "Evidence standard", 66, 288, PINK)
    evidence = [
        "Organic and sponsored work are labeled clearly.",
        "Revenue, traffic, and sell-out claims require approved documentation.",
        "Restaurant-owner testimonials are used only with permission.",
        "Photography, video, logos, and trademarks require usage clearance.",
        "Partners receive no guarantee of reach, sentiment, or business outcome.",
    ]
    y = 248
    for item in evidence:
        c.setFillColor(PINK)
        c.circle(72, y + 3, 3, fill=1, stroke=0)
        y = paragraph(c, item, 86, y, 446, size=9.3, leading=13) - 13
    footer(c, 4)
    c.showPage()

    c.setFillColor(INK)
    c.rect(0, 0, 612, 792, fill=1, stroke=0)
    image_cover(c, MEDIA / "keith-event.webp", 42, 442, 528, 302, radius=24)
    c.setFillColor(Color(0.07, 0.06, 0.06, alpha=0.55))
    c.roundRect(42, 442, 528, 302, 24, fill=1, stroke=0)
    top_label(c, "Start the conversation", 66, 704, BLUSH)
    c.setFillColor(PAPER)
    c.setFont("Helvetica-Bold", 36)
    c.drawString(66, 648, "Bring the right story")
    c.drawString(66, 608, "to the table.")
    paragraph(c, "Qualified restaurant, hospitality, destination, media, and live-event opportunities begin with the official partnership inquiry.", 66, 566, 390, size=10.5, leading=16, color=PAPER)
    c.setFillColor(PINK)
    c.roundRect(42, 278, 528, 122, 22, fill=1, stroke=0)
    c.setFillColor(PAPER)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(66, 366, "OFFICIAL PARTNERSHIP PLATFORM")
    c.setFont("Helvetica-Bold", 14)
    c.drawString(66, 335, "keith-lee-partnerships.abdulbaasitisah436.chatgpt.site")
    c.setFont("Helvetica", 9.5)
    c.drawString(66, 308, "Partnership inbox: abdulbaasitisah436@gmail.com")
    c.linkURL("https://keith-lee-partnerships.abdulbaasitisah436.chatgpt.site/partner", (42, 278, 570, 400), relative=0)
    c.setFillColor(PAPER)
    c.setFont("Times-Italic", 20)
    c.drawString(42, 214, "Selective by design. Professional at every step.")
    paragraph(c, "Submission does not create a booking, endorsement, contract, payment obligation, or guarantee of availability. Approved next steps are confirmed in writing through verified business channels.", 42, 176, 528, size=9, leading=14, color=WHITE_60)
    c.setStrokeColor(Color(1, 1, 1, alpha=0.16))
    c.line(42, 64, 570, 64)
    c.setFillColor(WHITE_60)
    c.setFont("Helvetica", 7.5)
    c.drawString(42, 44, "KEITH LEE - PUBLIC PARTNERSHIP MEDIA KIT")
    c.drawRightString(570, 44, "05")
    c.save()

    shutil.copyfile(OUTPUT, PUBLIC)
    print(OUTPUT)
    print(PUBLIC)


if __name__ == "__main__":
    build()
