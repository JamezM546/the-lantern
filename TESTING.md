# The Lantern — Test Checklist

## Vanilla app

Open `index.html` (or Live Server), then check each item.

### Search
- [x] Type a real title (e.g. "Naruto") and click Search
- [x] You see result cards and a status like "Results for..."
- [x] Empty search shows a "please enter something" style message
- [x] Clear resets back toward trending

### Genres
- [x] Click a genre (e.g. Action)
- [x] Cards update and the heading shows that genre

### My List (save / remove)
- [x] Open a manga modal and Save
- [x] Toast (or feedback) appears
- [x] My List shows that manga
- [x] Remove it; list updates (empty message if none left)

### Smoke
- [x] Page loads and trending cards appear
- [x] Modal opens on card click and closes with X / background
- [x] Home brings you to trending upon first load / manual click

## React app (`the-lantern-react/`)

From the React folder, run `npm install` once, then `npm run dev`. Open the local URL Vite prints.

### Search
- [ ] Type a real title and click Search
- [ ] You see result cards and a status like "Results for..."
- [ ] Empty search shows "Please enter something to search."
- [ ] Clear resets back to trending

### Genres
- [ ] Click a genre (e.g. Action)
- [ ] Cards update and the heading shows that genre

### My List (save / remove)
- [ ] Open a manga modal and Save to My List
- [ ] My List in the nav shows that manga
- [ ] Remove from the modal; list updates (empty message if none left)

### Smoke
- [ ] Page loads and trending cards appear
- [ ] Modal opens on card click and closes with X or background click
- [ ] Home brings you back to trending

## Automated (unit + integration)

From the **repo root** (the folder with `app.js`, not `the-lantern-react/`):

```bash
npm install
npm test
```

`npm install` is only needed once (or after pulling dependency changes). There is still no build step to *run* the vanilla app in the browser.

### Unit tests (`helpers/`)

- **Display title**: English if present, otherwise romaji
- **Status**: known AniList codes become friendly labels (e.g. `RELEASING` → `Ongoing`); unknown codes echo back
- **Greeting**: time of day message from an hour (0–23)

### Integration test (`helpers/list.js`)

- **Save to My List**: adding a manga updates the in-memory list and writes JSON to storage; saving the same id twice does not duplicate (test uses a fake `setItem` / `getItem` instead of the browser's `localStorage`)

Search, genres, My List, and smoke checks above stay manual for vanilla. The React section is manual only for now.
