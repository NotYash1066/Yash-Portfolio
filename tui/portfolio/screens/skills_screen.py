from textual.app import ComposeResult
from textual.containers import Vertical
from textual.screen import Screen
from textual.widgets import Static

from ..data.portfolio_data import FAVORITE_TOOLS, LANGUAGES
from ..app import _nav_hint


class SkillsScreen(Screen):
    CSS = """
    SkillsScreen {
        align: center top;
    }
    """

    def compose(self) -> ComposeResult:
        with Vertical(classes="content-scroll"):
            yield Static("Skills & Tools", classes="page-title")
            yield Static("━" * 2, classes="separator")

            for category, tools in FAVORITE_TOOLS:
                yield Static(category, classes="section-heading")
                yield Static("   " + "  ·  ".join(tools), classes="bullet")

            yield Static("")
            yield Static("Languages", classes="section-heading")
            yield Static("─" * 2, classes="section-sep")
            for lang, level in LANGUAGES:
                yield Static(f"  • {lang}  ({level})", classes="bullet")
        yield Static(_nav_hint(), id="nav-hint")

    def on_mount(self) -> None:
        self.title = "Skills"
