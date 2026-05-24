"""About screen — bio, education, beliefs, operating principles."""

from textual.app import ComposeResult
from textual.containers import Vertical, Horizontal
from textual.screen import Screen
from textual.widgets import Static

from ..data.portfolio_data import (
    PROFILE,
    BELIEFS,
    OPERATING_PRINCIPLES,
    LANGUAGES,
)


class AboutScreen(Screen):
    """About me — background, beliefs, and operating principles."""

    CSS = """
    AboutScreen {
        align: center top;
        background: $surface;
    }

    #about-scroll {
        width: 80;
        height: 100%;
        margin: 0 2;
        overflow-y: auto;
    }

    SectionTitle {
        text-style: bold;
        color: $primary;
        margin: 1 0 0 0;
    }

    .subsection {
        margin: 0 0 1 0;
    }

    .bullet {
        color: $text;
        margin: 0 0 0 2;
    }

    .label {
        color: $accent;
        text-style: bold;
    }

    .value {
        color: $text;
    }

    #nav-hint {
        color: $text-disabled;
        text-align: center;
        margin: 1 0;
        width: 100%;
    }
    """

    def compose(self) -> ComposeResult:
        with Vertical(id="about-scroll"):
            yield Static("About Me", classes="SectionTitle")
            yield Static("─" * 50)
            yield Static(
                f"{PROFILE['heroSubtext']}",
                classes="subsection",
            )

            yield Static("Education", classes="SectionTitle")
            yield Static("─" * 50)
            yield Static(
                f"{PROFILE['university']} — {PROFILE['role']}",
                classes="subsection",
            )
            yield Static(
                f"CGPA: {PROFILE['cgpa']}  |  "
                f"Location: {PROFILE['location']}  |  "
                f"Grad: {PROFILE['graduationYear']}",
                classes="subsection",
            )

            yield Static("Languages", classes="SectionTitle")
            yield Static("─" * 50)
            for lang, level in LANGUAGES:
                yield Static(f"  • {lang} ({level})", classes="bullet")

            yield Static("Beliefs", classes="SectionTitle")
            yield Static("─" * 50)
            for b in BELIEFS:
                yield Static(f"  • {b}", classes="bullet")

            yield Static("Operating Principles", classes="SectionTitle")
            yield Static("─" * 50)
            for p in OPERATING_PRINCIPLES:
                yield Static(f"  • {p}", classes="bullet")

            yield Static("Open To", classes="SectionTitle")
            yield Static("─" * 50)
            for opp in [
                "Internships",
                "Full-time roles",
                "Startup opportunities",
                "Open-source collaboration",
            ]:
                yield Static(f"  • {opp}", classes="bullet")

            yield Static(
                "  [1] Home  [2] About  [3] Projects  "
                "[4] Skills  [5] Now  [6] Contact  [7] Quotes  [q] Quit",
                id="nav-hint",
            )

    def on_mount(self) -> None:
        self.title = "About Me"
