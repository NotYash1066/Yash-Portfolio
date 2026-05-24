"""ASCII photo widget — renders a photo as ASCII art inside a bordered frame."""

from textual.widgets import Static
from textual.app import ComposeResult

from ..utils.image_to_ascii import image_to_ascii


class AsciiPhoto(Static):
    """A widget that displays a photo converted to ASCII art.

    The photo is loaded once during composition and rendered as a
    bordered block of ASCII characters. If no photo file exists, a
    stylised 'YK' monogram placeholder is shown instead.
    """

    DEFAULT_CSS = """
    AsciiPhoto {
        width: 52;
        height: 28;
        margin: 0 1;
        border: solid $primary;
        overflow: hidden;
    }
    """

    def __init__(
        self,
        photo_path: str | None = None,
        width: int = 48,
        height: int = 24,
    ) -> None:
        super().__init__()
        self.photo_path = photo_path
        self.ascii_width = width
        self.ascii_height = height

    def compose(self) -> ComposeResult:
        ascii_str = image_to_ascii(
            path=self.photo_path,
            width=self.ascii_width,
            height=self.ascii_height,
        )
        yield Static(ascii_str, id="ascii-art")
