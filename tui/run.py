#!/usr/bin/env python3
"""Entry point for the terminal portfolio.

Usage:
    python run.py

Requires: `pip install -r requirements.txt`
"""

import sys
import os

# Ensure the tui/ package is importable
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from portfolio.app import run  # noqa: E402

if __name__ == "__main__":
    run()
