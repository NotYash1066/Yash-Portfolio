from textual.app import ComposeResult
from textual.containers import Vertical
from textual.screen import Screen
from textual.widgets import Static

from ..data.portfolio_data import PROFILE
from ..app import _nav_hint


class ContactScreen(Screen):
    CSS = """
    ContactScreen {
        align: center middle;
    }

    #contact-box {
        width: auto;
        max-width: 100%;
        height: auto;
        border: solid $primary;
        padding: 1 2;
        margin: 0 1;
    }
    """

    def compose(self) -> ComposeResult:
        with Vertical(id="contact-box"):
            yield Static("Contact", classes="page-title")
            yield Static("━" * 2, classes="separator")
            yield Static("")
            yield Static(f"  Email   │ {PROFILE['email']}")
            yield Static(f"  Phone   │ {PROFILE['phone']}")
            yield Static("")
            yield Static(f"  GitHub  │ {PROFILE['github']}")
            yield Static(f"  LinkedIn│ {PROFILE['linkedin']}")
            yield Static("")
            yield Static("─" * 2, classes="section-sep")
            yield Static("Open To", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            for opp in [
                "Internships",
                "Full-time roles",
                "Startup opportunities",
                "Open-source collaboration",
            ]:
                yield Static(f"  • {opp}", classes="bullet")
            yield Static("")
            yield Static("─" * 2, classes="section-sep")
            yield Static(PROFILE["closingLine"], classes="dim")
        yield Static(_nav_hint(), id="nav-hint")

    def on_mount(self) -> None:
        self.title = "Contact"
