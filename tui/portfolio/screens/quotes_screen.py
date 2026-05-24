from textual.app import ComposeResult
from textual.containers import Vertical
from textual.screen import Screen
from textual.widgets import Static

from ..data.portfolio_data import QUOTES
from ..app import _nav_hint


class QuotesScreen(Screen):
    CSS = """
    QuotesScreen {
        align: center middle;
    }

    #quotes-box {
        width: auto;
        max-width: 100%;
        height: auto;
        border: solid $primary;
        padding: 1 2;
        margin: 0 1;
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
    }

    #action-hint {
        color: $accent;
        text-align: center;
    }
    """

    def compose(self) -> ComposeResult:
        self._current_idx = 0
        with Vertical(id="quotes-box"):
            yield Static("Engineering Philosophy", classes="page-title")
            yield Static("━" * 2, classes="separator")
            yield Static("", id="quote-index", classes="quote-index")
            yield Static("", id="quote-display", classes="quote-text")
            yield Static("", classes="separator")
            yield Static("  [SPACE] Next quote  ", id="action-hint")
        yield Static(_nav_hint(), id="nav-hint")

    def on_mount(self) -> None:
        self.title = "Quotes"
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
