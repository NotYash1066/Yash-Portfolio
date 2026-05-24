# Terminal Portfolio

A TUI (Terminal User Interface) portfolio for Yash Karthiya — runs entirely in your terminal. Features ASCII art photo rendering, keyboard navigation, and full portfolio content.

## Quick Start

```bash
# 1. (Optional) Add your photo
#    Place a photo.jpg or photo.png in tui/assets/
#    The app will convert it to ASCII art automatically

# 2. Run (auto-creates venv + installs deps)
python run.py
```

The first run creates a virtual environment in `tui/.venv/` and installs
dependencies automatically. Subsequent runs use the cached venv directly.

### Manual setup (if you prefer)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python run.py
```

## Navigation

| Key | Screen     |
|-----|------------|
| `1` | Home       |
| `2` | About      |
| `3` | Projects   |
| `4` | Skills     |
| `5` | Now        |
| `6` | Contact    |
| `7` | Quotes     |
| `q` / `Esc` | Quit |

On the Quotes screen, press `Space` to cycle through quotes.

## Screens

- **Home** — ASCII art photo + name + role + tagline
- **About** — Bio, education, languages, beliefs, operating principles
- **Projects** — Scrollable project list with detail view (select with arrow keys)
- **Skills** — Technical tools grouped by category + languages
- **Now** — Current focus, learning, building, reading, next milestone
- **Contact** — Email, phone, GitHub, LinkedIn, open-to opportunities
- **Quotes** — Rotating engineering philosophy quotes

## Photo Setup

The app looks for your photo at `tui/assets/photo.jpg` (or `photo.png`). If found, it's converted to ASCII art and displayed on the Home screen. If no photo is found, a stylised "YK" monogram placeholder is shown instead.

Recommended photo specs:
- Square or near-square aspect ratio
- Good lighting and contrast
- Face clearly visible (headshot works best)
- ~500x500px minimum resolution

## Requirements

- Python 3.10+
- `textual` — TUI framework
- `Pillow` — Image processing (only needed if using photo)

## Project Structure

```
tui/
├── requirements.txt              # Python dependencies
├── run.py                        # Entry point
├── README.md                     # This file
├── assets/
│   └── photo.jpg                 # Your photo (optional)
└── portfolio/
    ├── app.py                    # Main Textual App
    ├── data/
    │   └── portfolio_data.py     # All portfolio content
    ├── screens/
    │   ├── home_screen.py        # Home / hero
    │   ├── about_screen.py       # About me
    │   ├── projects_screen.py    # Project gallery
    │   ├── skills_screen.py      # Skills & tools
    │   ├── now_screen.py         # Current focus
    │   ├── contact_screen.py     # Contact info
    │   └── quotes_screen.py      # Philosophy quotes
    ├── utils/
    │   └── image_to_ascii.py     # Photo → ASCII converter
    └── widgets/
        └── ascii_photo.py        # ASCII photo Textual widget
```

## Tech Stack

- **[Textual](https://textual.textualize.io/)** — Python TUI framework (CSS-based styling, async)
- **[Pillow](https://python-pillow.org/)** — Image processing for ASCII conversion
