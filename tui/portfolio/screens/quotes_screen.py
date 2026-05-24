"""Quotes screen — rotating engineering quotes."""

import random

from textual.app import ComposeResult
from textual.containers import Vertical
from textual.screen import Screen
from textual.widgets import Static

from ..data.portfolio_data import QUOTES


class QuotesScreen(Screen):
    """Engineering quotes that reflect Yash's philosophy."""

    CSS = """
    QuotesScreen {
        align: center middle;
        background: $surface;
    }

    #quotes-box {
        width: 72;
        height: auto;
        border: solid $primary;
        padding: 2 3;
    }

    .section-title {
        text-style: bold;
        color: $primary;
        margin: 0 0 1 0;
        text-align: center;
    }

    .quote-text {
        color: $text;
        text-style: italic;
        text-align: center;
        margin: 1 0;
    }

    .quote-index {
        color: $text-muted;
        text-align: center;
        margin: 0 0 1 0;
    }

    .separator {
        color: $primary 30%;
        text-align: center;
    }

    #action-hint {
        color: $accent;
        text-align: center;
        margin: 1 0 0 0;
    }

    #nav-hint {
        color: $text-disabled;
        text-align: center;
        margin: 1 0;
    }
    """

    def compose(self) -> ComposeResult:
        self._current_idx = 0
        with Vertical(id="quotes-box"):
            yield Static("Engineering Philosophy", classes="section-title")
            yield Static("━" * 50, classes="separator")
            yield Static("", id="quote-index", classes="quote-index")
            yield Static("", id="quote-display", classes="quote-text")
            yield Static("", classes="separator")
            yield Static(
                "  [SPACE] Next quote  ",
                id="action-hint",
            )
        yield Static(
            "  [1] Home  [2] About  [3] Projects  "
            "[4] Skills  [5] Now  [6] Contact  [7] Quotes  [q] Quit",
            id="nav-hint",
        )

    def on_mount(self) -> None:
        self.title = "Quotes"
        self._show_quote(0)

    def on_screen_resume(self) -> None:
        self._current_idx = 0
        self._show_quote(0)

    def _show_quote(self, idx: int) -> None:
        if not QUOTES:
            return
        idx = idx % len(QUOTES)
        self._current_idx = idx
        self.query_one("#quote-index", Static).update(
            f"Quote {idx + 1} of {len(QUOTES)}"
        )
        self.query_one("#quote-display", Static).update(f'"{QUOTES[idx]}"')

    def on_key(self, event) -> None:
        if event.key == "space":
            self._show_quote(self._current_idx + 1)
            event.prevent_default()
