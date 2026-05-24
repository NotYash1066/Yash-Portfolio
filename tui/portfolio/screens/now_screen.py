"""Now screen — what Yash is currently focused on / learning / building."""

from textual.app import ComposeResult
from textual.containers import Vertical
from textual.screen import Screen
from textual.widgets import Static

from ..data.portfolio_data import CURRENT, PROFILE


class NowScreen(Screen):
    """Currently focused on — right-now snapshot."""

    CSS = """
    NowScreen {
        align: center top;
        background: $surface;
    }

    #now-scroll {
        width: 74;
        height: 100%;
        margin: 0 2;
        overflow-y: auto;
    }

    .section-title {
        text-style: bold;
        color: $primary;
        margin: 1 0 0 0;
    }

    .section-content {
        color: $text;
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

    .separator {
        color: $primary 30%;
        margin: 0 0 1 0;
    }

    .quote {
        color: $text-muted;
        text-style: italic;
        margin: 1 0;
        text-align: center;
    }

    #nav-hint {
        color: $text-disabled;
        text-align: center;
        margin: 1 0;
        width: 100%;
    }
    """

    def compose(self) -> ComposeResult:
        with Vertical(id="now-scroll"):
            yield Static("Now", classes="section-title")
            yield Static("━" * 40, classes="separator")
            yield Static(
                "What I'm focused on right now.",
                classes="section-content",
            )

            yield Static("Focus", classes="section-title")
            yield Static("─" * 30, classes="separator")
            yield Static(PROFILE["currentFocus"], classes="section-content")

            yield Static("Learning", classes="section-title")
            yield Static("─" * 30, classes="separator")
            for item in CURRENT["learning"]:
                yield Static(f"  →  {item}", classes="bullet")

            yield Static("Building", classes="section-title")
            yield Static("─" * 30, classes="separator")
            for item in CURRENT["building"]:
                yield Static(f"  →  {item}", classes="bullet")

            yield Static("Reading", classes="section-title")
            yield Static("─" * 30, classes="separator")
            yield Static(CURRENT["reading"], classes="section-content")

            yield Static("Improving", classes="section-title")
            yield Static("─" * 30, classes="separator")
            yield Static(CURRENT["improving"], classes="section-content")

            yield Static("Current Obsession", classes="section-title")
            yield Static("─" * 30, classes="separator")
            yield Static(CURRENT["obsession"], classes="section-content")

            yield Static("Next Milestone", classes="section-title")
            yield Static("─" * 30, classes="separator")
            yield Static(CURRENT["nextMilestone"], classes="section-content")

        yield Static(
            "  [1] Home  [2] About  [3] Projects  "
            "[4] Skills  [5] Now  [6] Contact  [7] Quotes  [q] Quit",
            id="nav-hint",
        )

    def on_mount(self) -> None:
        self.title = "Now"
