"""Projects screen — scrollable list with detail view for each project."""

from textual.app import ComposeResult
from textual.containers import Vertical, Horizontal
from textual.screen import Screen
from textual.widgets import Static, ListView, ListItem
from textual import events

from ..data.portfolio_data import PROJECTS


class ProjectsScreen(Screen):
    """Browse projects. Select one to see full details."""

    CSS = """
    ProjectsScreen {
        background: $surface;
    }

    #projects-layout {
        width: 100%;
        height: 100%;
    }

    #sidebar {
        width: 30;
        height: 100%;
        border-right: solid $primary;
        padding: 0 1;
    }

    #sidebar-title {
        text-style: bold;
        color: $primary;
        margin: 1 0;
        text-align: center;
    }

    #project-list {
        height: 1fr;
    }

    ListItem {
        padding: 0 1;
    }

    ListItem:hover {
        background: $primary 10%;
    }

    ListView:focus .list-item--focused {
        background: $primary 20%;
    }

    #detail-panel {
        width: 1fr;
        height: 100%;
        padding: 1 2;
        overflow-y: auto;
    }

    #detail-title {
        text-style: bold;
        color: $primary;
        margin: 0 0 1 0;
    }

    #detail-summary {
        color: $text;
        margin: 0 0 1 0;
    }

    #detail-stack {
        color: $accent;
        margin: 0 0 1 0;
    }

    #detail-role {
        color: $text-muted;
        margin: 0 0 1 0;
    }

    #detail-status {
        color: $success;
        margin: 0 0 1 0;
    }

    .section-label {
        color: $primary;
        text-style: bold;
        margin: 1 0 0 0;
    }

    #nav-hint {
        color: $text-disabled;
        text-align: center;
        margin: 1 0;
        width: 100%;
    }

    #no-selection {
        color: $text-muted;
        text-align: center;
        margin: 10 0;
    }
    """

    def compose(self) -> ComposeResult:
        with Horizontal(id="projects-layout"):
            with Vertical(id="sidebar"):
                yield Static("Projects", id="sidebar-title")
                yield Static("─" * 26)
                items = [ListItem(Static(p["title"])) for p in PROJECTS]
                yield ListView(*items, id="project-list")
            with Vertical(id="detail-panel"):
                yield Static("Select a project to view details", id="no-selection")
                yield Static("", id="detail-title")
                yield Static("", id="detail-summary")
                yield Static("", id="detail-role")
                yield Static("", id="detail-status")
                yield Static("", id="detail-stack")
                yield Static("", id="detail-github")
        yield Static(
            "  [1] Home  [2] About  [3] Projects  "
            "[4] Skills  [5] Now  [6] Contact  [7] Quotes  [q] Quit",
            id="nav-hint",
        )

    def on_mount(self) -> None:
        self.title = "Projects"
        if PROJECTS:
            self._show_project(0)
            list_view = self.query_one("#project-list", ListView)
            list_view.index = 0

    def on_list_view_selected(self, event: ListView.Selected) -> None:
        idx = self.query_one("#project-list", ListView).index
        if idx is not None:
            self._show_project(idx)

    def _show_project(self, idx: int) -> None:
        if idx < 0 or idx >= len(PROJECTS):
            return
        p = PROJECTS[idx]
        self.query_one("#no-selection", Static).display = False
        self.query_one("#detail-title", Static).update(p["title"])
        self.query_one("#detail-summary", Static).update(p["summary"])
        self.query_one("#detail-role", Static).update(f"Role: {p['role']}")
        self.query_one("#detail-status", Static).update(f"Status: {p['status']}")
        stack_str = "  ".join(p["stack"])
        self.query_one("#detail-stack", Static).update(f"Stack: {stack_str}")
        self.query_one("#detail-github", Static).update(f"GitHub: {p['github']}")
