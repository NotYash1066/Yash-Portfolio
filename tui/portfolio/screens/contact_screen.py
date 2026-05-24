"""Contact screen — email, GitHub, LinkedIn, phone, and open-to."""

from textual.app import ComposeResult
from textual.containers import Vertical
from textual.screen import Screen
from textual.widgets import Static

from ..data.portfolio_data import PROFILE


class ContactScreen(Screen):
    """Contact information and links."""

    CSS = """
    ContactScreen {
        align: center middle;
        background: $surface;
    }

    #contact-box {
        width: 60;
        height: auto;
        border: solid $primary;
        padding: 1 2;
    }

    .section-title {
        text-style: bold;
        color: $primary;
        margin: 1 0 0 0;
        text-align: center;
    }

    .contact-row {
        color: $text;
        margin: 0 0 0 0;
    }

    .label {
        color: $accent;
    }

    .separator {
        color: $primary 30%;
        text-align: center;
    }

    #nav-hint {
        color: $text-disabled;
        text-align: center;
        margin: 1 0;
    }
    """

    def compose(self) -> ComposeResult:
        with Vertical(id="contact-box"):
            yield Static("Contact", classes="section-title")
            yield Static("━" * 40, classes="separator")

            yield Static("")
            yield Static(f"  Email    │  {PROFILE['email']}", classes="contact-row")
            yield Static(f"  Phone    │  {PROFILE['phone']}", classes="contact-row")
            yield Static("", classes="separator")
            yield Static(f"  GitHub   │  {PROFILE['github']}", classes="contact-row")
            yield Static(
                f"  LinkedIn │  {PROFILE['linkedin']}",
                classes="contact-row",
            )
            yield Static("")
            yield Static("─" * 40, classes="separator")

            yield Static("Open To", classes="section-title")
            yield Static("─" * 40, classes="separator")

            for opp in [
                "Internships",
                "Full-time roles",
                "Startup opportunities",
                "Open-source collaboration",
            ]:
                yield Static(f"  • {opp}", classes="contact-row")

            yield Static("")
            yield Static("─" * 40, classes="separator")
            yield Static(PROFILE["closingLine"], classes="section-title")

        yield Static(
            "  [1] Home  [2] About  [3] Projects  "
            "[4] Skills  [5] Now  [6] Contact  [7] Quotes  [q] Quit",
            id="nav-hint",
        )

    def on_mount(self) -> None:
        self.title = "Contact"
