# Calculator

A responsive, keyboard-friendly calculator built with plain HTML, CSS, and
JavaScript. This was one of my first web projects; it is kept public as a marker
of that learning journey and has since been refined for accessibility,
reliability, and mobile use.

**[Open the live calculator](https://skamprogiannis.github.io/calculator/)**

## Features

- Addition, subtraction, multiplication, and division
- Decimal, percentage, sign toggle, backspace, and all-clear controls
- Chained calculations with a visible expression
- Mouse, touch, and keyboard input
- Responsive layout with accessible labels and focus states
- Dependency-free calculation core covered by automated tests

## Keyboard controls

| Action | Keys |
| --- | --- |
| Enter numbers | `0`–`9` and `.` |
| Choose an operation | `+`, `-`, `*`, `/` |
| Calculate | `Enter` or `=` |
| Delete a digit | `Backspace` |
| Clear | `Escape` or `C` |
| Convert to a percentage | `%` |

## Run locally

Serve the repository with any static HTTP server. For example:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Tests

The calculation model uses Node's built-in test runner, so no dependencies are
required:

```bash
node --test
```

The live version is published from the `main` branch with GitHub Pages.
