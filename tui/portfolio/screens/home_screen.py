"""Home screen — ASCII art photo hero with name, role, tagline."""

from textual.app import ComposeResult
from textual.containers import Horizontal, Vertical
from textual.screen import Screen
from textual.widgets import Static

from ..data.portfolio_data import PROFILE
from ..widgets.ascii_photo import AsciiPhoto


class HomeScreen(Screen):
    """Landing screen — photo, name, role, and signature line."""

    CSS = """
    HomeScreen {
        align: center middle;
        background: $surface;
    }

    #hero-container {
        align: center middle;
        height: auto;
        max-width: 90;
    }

    #photo-column {
        width: 52;
        height: auto;
        margin: 0 1;
    }

    #info-column {
        width: 40;
        height: auto;
        margin: 0 1;
        padding: 0 1;
    }

    #name {
        text-style: bold;
        color: $primary;
        text-align: left;
        margin: 0 0 0 0;
    }

    #role {
        text-style: italic;
        color: $text;
        text-align: left;
        margin: 0 0 1 0;
    }

    #tagline {
        color: $text-muted;
        text-align: left;
        margin: 1 0 0 0;
    }

    #nav-hint {
        color: $text-disabled;
        text-align: center;
        margin: 1 0 0 0;
    }

    #closing-line {
        color: $accent;
        text-align: center;
        margin: 1 0 0 0;
        text-style: italic;
    }

    #separator {
        color: $primary;
        text-align: center;
        margin: 1 0;
    }
    """

    def compose(self) -> ComposeResult:
        with Vertical(id="hero-container"):
            with Horizontal():
                with Vertical(id="photo-column"):
                    yield AsciiPhoto(width=48, height=24)
                with Vertical(id="info-column"):
                    yield Static(PROFILE["name"], id="name")
                    yield Static(PROFILE["role"], id="role")
                    yield Static("─" * 30, id="separator")
                    yield Static(PROFILE["heroDescription"], id="tagline")
                    yield Static("", id="spacer")
                    yield Static(PROFILE["signatureLine"], id="closing-line")
            yield Static(
                "  [1] Home  [2] About  [3] Projects  "
                "[4] Skills  [5] Now  [6] Contact  [7] Quotes  [q] Quit",
                id="nav-hint",
            )

    def on_mount(self) -> None:
        self.title = "Yash Karthiya — Portfolio"
