#!/usr/bin/env python3
"""Terminal portfolio — entry point.

Auto-creates a virtual environment and installs dependencies
on first run. Handles Debian's PEP 668 externally-managed
environment restriction gracefully.
"""

import subprocess
import sys
import os

HERE = os.path.dirname(os.path.abspath(__file__))
VENV_DIR = os.path.join(HERE, ".venv")
REQUIREMENTS = os.path.join(HERE, "requirements.txt")


def _in_venv():
    """Check if we're already running inside a virtual environment."""
    return (
        sys.prefix != sys.base_prefix
        or os.environ.get("PIP_REQUIRE_VIRTUALENV") == "1"
    )


def _ensure_venv():
    """Create a venv if one doesn't exist, install deps, re-exec."""
    if _in_venv():
        return False

    if not os.path.isdir(VENV_DIR):
        print("Creating virtual environment...")
        subprocess.check_call(
            [sys.executable, "-m", "venv", VENV_DIR]
        )

    # Install dependencies
    pip = os.path.join(VENV_DIR, "bin", "pip")
    print("Installing dependencies...")
    subprocess.check_call(
        [pip, "install", "--quiet", "-r", REQUIREMENTS]
    )

    # Re-execute ourselves with the venv's python
    python = os.path.join(VENV_DIR, "bin", "python")
    os.execv(python, [python, __file__] + sys.argv[1:])
    return True


def main():
    sys.path.insert(0, HERE)

    from portfolio.app import run as start_app  # noqa: E402

    start_app()


if __name__ == "__main__":
    if not _ensure_venv():
        main()
