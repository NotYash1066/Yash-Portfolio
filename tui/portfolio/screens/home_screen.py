from textual.app import ComposeResult
from textual.containers import Horizontal, Vertical
from textual.screen import Screen
from textual.widgets import Static

from ..data.portfolio_data import PROFILE
from ..widgets.ascii_photo import AsciiPhoto
from ..app import _nav_hint


class HomeScreen(Screen):
    CSS = """
    HomeScreen {
        align: center middle;
    }

    #hero {
        width: 100%;
        height: 1fr;
        align: center middle;
    }

    #hero-inner {
        width: auto;
        max-width: 100%;
        height: auto;
        align: center middle;
    }

    #ascii-wrap {
        width: auto;
        height: auto;
        border: solid $primary;
        margin: 0 0 0 0;
    }

    #info-col {
        width: auto;
        max-width: 100%;
        height: auto;
        padding: 0 1;
    }

    #name {
        text-style: bold;
        color: $primary;
    }

    #role {
        text-style: italic;
        color: $text;
    }

    #tagline {
        color: $text-muted;
    }

    #sig {
        color: $accent;
        text-style: italic;
    }
    """

    def compose(self) -> ComposeResult:
        term_w = self.app.size.width if hasattr(self.app, 'size') else 80
        ascii_w = max(20, min(48, (term_w - 8) // 2))
        ascii_h = max(10, min(24, ascii_w // 2))

        with Vertical(id="hero"):
            with Horizontal(id="hero-inner"):
                with Vertical(id="ascii-wrap"):
                    yield AsciiPhoto(width=ascii_w, height=ascii_h)
                with Vertical(id="info-col"):
                    yield Static(PROFILE["name"], id="name")
                    yield Static(PROFILE["role"], id="role")
                    yield Static("", id="sep")
                    yield Static(PROFILE["heroDescription"], id="tagline")
                    yield Static("", id="spacer")
                    yield Static(PROFILE["signatureLine"], id="sig")
        yield Static(_nav_hint(), id="nav-hint")

    def on_mount(self) -> None:
        self.title = "Yash Karthiya — Portfolio"
