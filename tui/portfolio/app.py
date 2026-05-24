from textual.app import App
from textual.binding import Binding

from .screens.home_screen import HomeScreen
from .screens.about_screen import AboutScreen
from .screens.projects_screen import ProjectsScreen
from .screens.skills_screen import SkillsScreen
from .screens.now_screen import NowScreen
from .screens.contact_screen import ContactScreen
from .screens.quotes_screen import QuotesScreen


class PortfolioApp(App):
    CSS = """
    Screen {
        background: $surface;
    }

    #nav-hint {
        dock: bottom;
        height: 1;
        color: $text-disabled;
        text-align: center;
    }

    .page-title {
        text-style: bold;
        color: $primary;
        width: 100%;
        text-align: center;
    }

    .separator {
        color: $primary 30%;
        width: 100%;
        text-align: center;
    }

    .section-heading {
        text-style: bold;
        color: $accent;
        margin: 0 0 0 1;
    }

    .section-sep {
        color: $primary 20%;
        width: 100%;
    }

    .bullet {
        color: $text;
        margin: 0 0 0 2;
    }

    .content-scroll {
        width: 100%;
        height: 1fr;
        overflow-y: auto;
        overflow-x: hidden;
        margin: 0 1;
    }

    .dim {
        color: $text-muted;
    }
    """

    SCREENS = {
        "home": HomeScreen,
        "about": AboutScreen,
        "projects": ProjectsScreen,
        "skills": SkillsScreen,
        "now": NowScreen,
        "contact": ContactScreen,
        "quotes": QuotesScreen,
    }

    BINDINGS = [
        Binding("1", "go_home", "Home"),
        Binding("2", "go_about", "About"),
        Binding("3", "go_projects", "Projects"),
        Binding("4", "go_skills", "Skills"),
        Binding("5", "go_now", "Now"),
        Binding("6", "go_contact", "Contact"),
        Binding("7", "go_quotes", "Quotes"),
        Binding("q", "quit", "Quit"),
        Binding("escape", "quit", "Quit"),
    ]

    def action_go_home(self) -> None:
        self.switch_screen("home")

    def action_go_about(self) -> None:
        self.switch_screen("about")

    def action_go_projects(self) -> None:
        self.switch_screen("projects")

    def action_go_skills(self) -> None:
        self.switch_screen("skills")

    def action_go_now(self) -> None:
        self.switch_screen("now")

    def action_go_contact(self) -> None:
        self.switch_screen("contact")

    def action_go_quotes(self) -> None:
        self.switch_screen("quotes")

    def on_mount(self) -> None:
        self.push_screen("home")


def _nav_hint() -> str:
    return " [1]Home [2]About [3]Projects [4]Skills [5]Now [6]Contact [7]Quotes  [q]Quit"


def run():
    app = PortfolioApp()
    app.run()
