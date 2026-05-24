from textual.app import ComposeResult
from textual.containers import Vertical
from textual.screen import Screen
from textual.widgets import Static

from ..data.portfolio_data import CURRENT, PROFILE
from ..app import _nav_hint


class NowScreen(Screen):
    CSS = """
    NowScreen {
        align: center top;
    }
    """

    def compose(self) -> ComposeResult:
        with Vertical(classes="content-scroll"):
            yield Static("Now", classes="page-title")
            yield Static("━" * 2, classes="separator")
            yield Static("What I'm focused on right now.", classes="dim")
            yield Static("")

            yield Static("Focus", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            yield Static(PROFILE["currentFocus"])
            yield Static("")

            yield Static("Learning", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            for item in CURRENT["learning"]:
                yield Static(f"  →  {item}", classes="bullet")
            yield Static("")

            yield Static("Building", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            for item in CURRENT["building"]:
                yield Static(f"  →  {item}", classes="bullet")
            yield Static("")

            yield Static("Reading", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            yield Static(CURRENT["reading"])
            yield Static("")

            yield Static("Improving", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            yield Static(CURRENT["improving"])
            yield Static("")

            yield Static("Current Obsession", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            yield Static(CURRENT["obsession"])
            yield Static("")

            yield Static("Next Milestone", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            yield Static(CURRENT["nextMilestone"])
        yield Static(_nav_hint(), id="nav-hint")

    def on_mount(self) -> None:
        self.title = "Now"
