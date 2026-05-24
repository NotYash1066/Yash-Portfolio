"""Convert images to ASCII art for terminal display.

Uses Pillow to resize and quantize an image, then maps pixel
luminance to a set of ASCII characters for maximum terminal impact.
"""

import os
from pathlib import Path

# The ASCII ramp — dense chars at the front create darker areas,
# sparse chars at the back create lighter areas.
ASCII_RAMP = "@%#*+=-. "

PHOTO_PATH = Path(__file__).resolve().parent.parent.parent / "assets" / "photo.jpg"
FALLBACK_PHOTO_PATH = (
    Path(__file__).resolve().parent.parent.parent / "assets" / "photo.png"
)


def _load_pillow():
    """Lazy-import Pillow so missing deps surface a clear error."""
    try:
        from PIL import Image as PILImage  # noqa: PLC0415

        return PILImage
    except ImportError:
        return None


def image_to_ascii(
    path: str | None = None,
    width: int = 48,
    height: int = 24,
) -> str:
    """Convert an image file to an ASCII art string.

    Parameters
    ----------
    path : str or None
        Path to the image file. If None, searches for photo.jpg or
        photo.png in the assets directory.
    width : int
        Output width in characters (default 48).
    height : int
        Output height in characters (default 24).

    Returns
    -------
    str
        Multi-line ASCII art string. Returns a fallback message if
        the image cannot be loaded.
    """
    PILImage = _load_pillow()
    if PILImage is None:
        return _fallback_ascii(width, height, "Pillow not installed")

    resolved = path or _find_photo()
    if not resolved or not os.path.isfile(resolved):
        return _fallback_ascii(width, height, "No photo found")

    try:
        img = PILImage.open(resolved).convert("L")  # grayscale
    except Exception:
        return _fallback_ascii(width, height, "Photo load error")

    # Resize — stretch slightly vertically to compensate for
    # terminal characters being ~2x taller than wide.
    img = img.resize((width, int(height * 2.2)), PILImage.LANCZOS)
    pixels = list(img.getdata())

    chars = []
    ramp_len = len(ASCII_RAMP)
    for i, p in enumerate(pixels):
        idx = min(p * ramp_len // 256, ramp_len - 1)
        chars.append(ASCII_RAMP[idx])
        if (i + 1) % width == 0:
            chars.append("\n")

    return "".join(chars)


def _find_photo() -> str | None:
    """Return path of first existing photo in assets dir."""
    for p in (PHOTO_PATH, FALLBACK_PHOTO_PATH):
        if p.is_file():
            return str(p.resolve())
    return None


def _fallback_ascii(width: int, height: int, reason: str) -> str:
    """Generate a geometric fallback pattern when no photo is available.

    Renders a large stylised 'YK' monogram as a placeholder.
    """
    lines = []
    lines.append("")
    lines.append(f"  [{reason} — provide tui/assets/photo.jpg]")
    lines.append("")
    # A simple ASCII diamond / YK emblem
    art = [
        "   ██╗   ██╗██╗  ██╗",
        "   ╚██╗ ██╔╝██║ ██╔╝",
        "    ╚████╔╝ █████╔╝ ",
        "     ╚██╔╝  ██╔═██╗ ",
        "      ██║   ██║  ██╗",
        "      ╚═╝   ╚═╝  ╚═╝",
    ]
    lines.extend(art)
    lines.append("")
    return "\n".join(lines)


def ascii_border(width: int = 60) -> str:
    """Return a horizontal border made of ASCII characters."""
    return "━" * width
