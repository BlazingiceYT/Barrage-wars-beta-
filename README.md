# Slowroads (Local Demo)

A small browser-based driving toy that runs entirely from local files in this repo.

## Run

Option 1: open `index.html` directly in your browser.

Option 2 (recommended): run a local server from the repo root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
# Slowroads (Lightweight Clone)

This repo contains a tiny browser-based driving toy inspired by long-road cruisers.

## Run

Open `index.html` in your browser.

## Controls

- `W` / `↑`: accelerate
- `S` / `↓`: brake
- `A` / `←`: steer left
- `D` / `→`: steer right

## 404 note

If you previously saw `404` errors for files like `static/js/...` or `manifest.json`,
that was from an old `index.html` referencing missing bundled assets. This version only
loads `./src/game.js`, which exists in this repository.
- `A` `D` / `←` `→`: steer
