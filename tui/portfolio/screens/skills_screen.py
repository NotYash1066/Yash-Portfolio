"""Skills screen — technical tools & languages, organised by category."""

from textual.app import ComposeResult
from textual.containers import Vertical, Horizontal
from textual.screen import Screen
from textual.widgets import Static

from ..data.portfolio_data import FAVORITE_TOOLS, LANGUAGES


class SkillsScreen(Screen):
    """Technical skills, tools, and languages."""

    CSS = """
    SkillsScreen {
        align: center top;
        background: $surface;
    }

    #skills-scroll {
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

    .category-name {
        color: $accent;
        text-style: bold;
        margin: 1 0 0 0;
    }

    .tools-list {
        color: $text;
        margin: 0 0 0 2;
    }

    .lang-item {
        color: $text;
        margin: 0 0 0 2;
    }

    .separator {
        color: $primary 30%;
        margin: 0 0 1 0;
    }

    #nav-hint {
        color: $text-disabled;
        text-align: center;
        margin: 1 0;
        width: 100%;
    }
    """

    def compose(self) -> ComposeResult:
        with Vertical(id="skills-scroll"):
            yield Static("Skills & Tools", classes="section-title")
            yield Static("━" * 40, classes="separator")

            for category, tools in FAVORITE_TOOLS:
                yield Static(category, classes="category-name")
                yield Static("  " + "  ·  ".join(tools), classes="tools-list")

            yield Static("", classes="separator")
            yield Static("Languages", classes="section-title")
            yield Static("━" * 40, classes="separator")

            for lang, level in LANGUAGES:
                yield Static(f"  • {lang}  ({level})", classes="lang-item")

        yield Static(
            "  [1] Home  [2] About  [3] Projects  "
            "[4] Skills  [5] Now  [6] Contact  [7] Quotes  [q] Quit",
            id="nav-hint",
        )

    def on_mount(self) -> None:
        self.title = "Skills"
