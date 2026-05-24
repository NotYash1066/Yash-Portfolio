"""Main Textual application — portfolio TUI with screen routing."""

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
    """Terminal portfolio for Yash Karthiya.

    Navigate between screens using number keys (1-7) or arrow keys.
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


def run():
    app = PortfolioApp()
    app.run()
