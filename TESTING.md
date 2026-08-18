# The Lantern — Test Checklist

## Manual

Open `index.html` (or Live Server), then check each item.

## Search
- [x] Type a real title (e.g. "Naruto") and click Search
- [x] You see result cards and a status like "Results for..."
- [x] Empty search shows a "please enter something" style message
- [x] Clear resets back toward trending

## Genres
- [x] Click a genre (e.g. Action)
- [x] Cards update and the heading shows that genre

## My List (save / remove)
- [x] Open a manga modal and Save
- [x] Toast (or feedback) appears
- [x] My List shows that manga
- [x] Remove it; list updates (empty message if none left)

## Smoke
- [x] Page loads and trending cards appear
- [x] Modal opens on card click and closes with X / background
- [x] Home brings you to trending upon first load / manual click

## Automated (unit tests)

From the **repo root** (the folder with `app.js`, not `the-lantern-react/`):

```bash
npm install
npm test
```

`npm install` is only needed once (or after pulling dependency changes). There is still no build step to *run* the vanilla app in the browser.

These tests cover two helpers in `helpers/`:

- **Display title** — English if present, otherwise romaji
- **Status** — known AniList codes become friendly labels (e.g. `RELEASING` → `Ongoing`); unknown codes echo back

Search, genres, My List, and smoke checks above stay manual.