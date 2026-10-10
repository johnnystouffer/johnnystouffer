"""Generate public/waves.webp, the seamless wallpaper tile behind the site.

Japanese-print style waves: each wave is a bundle of tapered lines over an
asymmetric hump, some with foam curls on the crest. Waves are drawn back to
front and each one erases what is behind it, so nearer waves hide farther
ones. The output is alpha only (black + transparency); Background.css uses
it as a mask, so the colour comes from the theme.

    python3 scripts/make-waves.py
"""
import math
import random

from PIL import Image, ImageDraw

W, H = 1000, 780        # tile size in CSS px
OUT = 2                 # output scale (2x for retina)
SS = 4                  # supersampling while drawing
K = OUT * SS            # CSS px -> drawing px
ROWS = 12
SEED = 7

rnd = random.Random(SEED)


def bump(u, crest):
    """0 at both ends, 1 at u == crest."""
    p = math.log(0.5) / math.log(crest)
    return math.sin(math.pi * u ** p)


def tapered(draw, pts, width, fill=255):
    """Polyline as a filled polygon whose width swells in the middle."""
    n = len(pts)
    left, right = [], []
    for i, (x, y) in enumerate(pts):
        x0, y0 = pts[max(i - 1, 0)]
        x1, y1 = pts[min(i + 1, n - 1)]
        dx, dy = x1 - x0, y1 - y0
        d = math.hypot(dx, dy) or 1
        t = i / (n - 1)
        w = width * max(math.sin(math.pi * t), 0) ** 0.6 / 2
        nx, ny = -dy / d * w, dx / d * w
        left.append((x + nx, y + ny))
        right.append((x - nx, y - ny))
    draw.polygon(left + right[::-1], fill=fill)


def foam(clusters):
    """Clusters of curls: one big curl with smaller ones tucked beside it."""
    curls = []
    for _ in range(clusters):
        off = rnd.uniform(-0.3, -0.1)
        curls.append((off, rnd.uniform(10, 14), 0))
        for k in range(rnd.randint(1, 3)):
            curls.append((off - 0.035 * (k + 1), rnd.uniform(6, 9),
                          rnd.uniform(-10, 4)))
    return curls


def make_wave(x0, base):
    w = rnd.uniform(300, 460)
    return dict(
        x0=x0, base=base, w=w,
        h=rnd.uniform(55, 95),
        crest=rnd.uniform(0.35, 0.6),
        lines=rnd.randint(7, 10),
        gap=rnd.uniform(5.5, 7),
        starts=[rnd.uniform(0, 0.12) for _ in range(10)],
        ends=[rnd.uniform(0.85, 1) for _ in range(10)],
        curls=foam(rnd.choice((0, 0, 1, 1, 2))),
    )


def line_y(wv, i, u):
    spread = 0.35 + 0.65 * math.sin(math.pi * u) ** 0.5
    return (wv['base'] - wv['h'] * bump(u, wv['crest']) * (1 - 0.05 * i)
            + i * wv['gap'] * spread)


def draw_wave(draw, wv, dx, dy):
    X = lambda u: (wv['x0'] + dx + u * wv['w']) * K
    Y = lambda i, u: (line_y(wv, i, u) + dy) * K
    us = [j / 80 for j in range(81)]
    last = wv['lines'] - 1

    # erase the band this wave covers, so farther waves disappear behind it
    top = [(X(u), Y(0, u) - 3 * K) for u in us]
    bottom = [(X(u), Y(last, u) + 4 * K) for u in reversed(us)]
    draw.polygon(top + bottom, fill=0)

    for i in range(wv['lines']):
        a, b = wv['starts'][i], wv['ends'][i]
        seg = [a + (b - a) * j / 80 for j in range(81)]
        tapered(draw, [(X(u), Y(i, u)) for u in seg],
                (2.2 if i == 0 else 1.5) * K)

    # foam curls sit on the rising side of the crest and spiral inward
    for off, r, lift in wv['curls']:
        u = max(wv['crest'] + off, 0.05)
        cx, cy = X(u), Y(0, u) - (r * 0.9 - lift) * K
        draw.ellipse([cx - r * K, cy - r * K, cx + r * K, cy + r * K], fill=0)
        turns = 2.3 * math.pi
        pts = []
        for j in range(60):
            th = turns * j / 59
            rr = r * K * (1 - th / (turns * 1.15))
            pts.append((cx + rr * math.cos(th + math.pi / 2),
                        cy + rr * math.sin(th + math.pi / 2)))
        tapered(draw, pts, 2 * K)


waves = []
for row in range(ROWS):
    base = (row + 0.5) * H / ROWS
    x = rnd.uniform(-200, 0)
    while x < W:
        waves.append(make_wave(x, base + rnd.uniform(-12, 12)))
        x += waves[-1]['w'] * rnd.uniform(0.55, 0.8)

# every wave plus its wrapped copies, painted from farthest (highest) to
# nearest, so the tile repeats without seams
copies = [(wv['base'] + dy, wv, dx, dy)
          for wv in waves for dx in (-W, 0, W) for dy in (-H, 0, H)]
img = Image.new('L', (W * K, H * K), 0)
draw = ImageDraw.Draw(img)
for _, wv, dx, dy in sorted(copies, key=lambda c: c[0]):
    draw_wave(draw, wv, dx, dy)

alpha = img.resize((W * OUT, H * OUT), Image.LANCZOS)
out = Image.merge('LA', (Image.new('L', alpha.size, 0), alpha))
out.save('public/waves.webp', lossless=True, method=6)
