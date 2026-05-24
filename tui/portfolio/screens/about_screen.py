from textual.app import ComposeResult
from textual.containers import Vertical
from textual.screen import Screen
from textual.widgets import Static

from ..data.portfolio_data import PROFILE, BELIEFS, OPERATING_PRINCIPLES, LANGUAGES
from ..app import _nav_hint


class AboutScreen(Screen):
    CSS = """
    AboutScreen {
        align: center top;
    }
    """

    def compose(self) -> ComposeResult:
        with Vertical(classes="content-scroll"):
            yield Static("About Me", classes="page-title")
            yield Static("━" * 2, classes="separator")
            yield Static(PROFILE["heroSubtext"])
            yield Static("")
            yield Static("Education", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            yield Static(f"{PROFILE['university']} — {PROFILE['role']}")
            yield Static(
                f"CGPA: {PROFILE['cgpa']}  |  Loc: {PROFILE['location']}  |  Grad: {PROFILE['graduationYear']}"
            )
            yield Static("")
            yield Static("Languages", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            for lang, level in LANGUAGES:
                yield Static(f"  • {lang} ({level})", classes="bullet")
            yield Static("")
            yield Static("Beliefs", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            for b in BELIEFS:
                yield Static(f"  • {b}", classes="bullet")
            yield Static("")
            yield Static("Operating Principles", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            for p in OPERATING_PRINCIPLES:
                yield Static(f"  • {p}", classes="bullet")
            yield Static("")
            yield Static("Open To", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            for opp in [
                "Internships",
                "Full-time roles",
                "Startup opportunities",
                "Open-source collaboration",
            ]:
                yield Static(f"  • {opp}", classes="bullet")
        yield Static(_nav_hint(), id="nav-hint")

    def on_mount(self) -> None:
        self.title = "About Me"
