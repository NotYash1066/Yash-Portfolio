from textual.app import ComposeResult
from textual.containers import Vertical, Horizontal
from textual.screen import Screen
from textual.widgets import Static, ListView, ListItem

from ..data.portfolio_data import PROJECTS
from ..app import _nav_hint


class ProjectsScreen(Screen):
    CSS = """
    ProjectsScreen {
        align: center top;
    }

    #projects-layout {
        width: 100%;
        height: 1fr;
    }

    #sidebar {
        width: 24;
        height: 100%;
        border-right: solid $primary;
    }

    #sidebar-title {
        text-style: bold;
        color: $primary;
        margin: 0 0 0 1;
    }

    #project-list {
        height: 1fr;
        margin: 0 0 0 0;
    }

    ListItem {
        padding: 0 1;
    }

    ListItem:hover {
        background: $primary 10%;
    }

    #detail-panel {
        width: 1fr;
        height: 100%;
        padding: 0 1;
        overflow-y: auto;
        overflow-x: hidden;
    }

    #detail-title {
        text-style: bold;
        color: $primary;
    }

    #detail-summary {
        color: $text;
    }

    #detail-role {
        color: $text-muted;
    }

    #detail-status {
        color: $success;
    }

    #detail-stack {
        color: $accent;
    }

    #detail-github {
        color: $text-muted;
    }

    #no-selection {
        color: $text-muted;
        text-align: center;
        margin: 4 0;
    }
    """

    def compose(self) -> ComposeResult:
        with Vertical(id="projects-layout"):
            with Horizontal():
                with Vertical(id="sidebar"):
                    yield Static("Projects", id="sidebar-title")
                    yield Static("─" * 2, classes="section-sep")
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
        yield Static(_nav_hint(), id="nav-hint")

    def on_mount(self) -> None:
        self.title = "Projects"
        if PROJECTS:
            self._show_project(0)
            lv = self.query_one("#project-list", ListView)
            lv.index = 0

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
        self.query_one("#detail-stack", Static).update("Stack: " + "  ".join(p["stack"]))
        self.query_one("#detail-github", Static).update(p["github"])
