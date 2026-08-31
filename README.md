# The Lantern

A cozy corner for manga discovery. The Lantern is a manga tracker and discovery web app where you can search for titles, save the ones you're interested in, and track what you're reading, all wrapped in a warm dark violet aesthetic.

This project is built as a hands-on learning vehicle. It started in **vanilla HTML, CSS, and JavaScript**, and is also rebuilt in **React + TypeScript** to practice modern front-end tools.

## Two versions

| Version | Folder | Status |
|---|---|---|
| **Vanilla JS** | repo root (`index.html`, `app.js`, `styles.css`) | Full featured app |
| **React + TypeScript** | `the-lantern-react/` | Core features complete |

Both use the [AniList API](https://anilist.co/) (GraphQL) for manga data.

## Features (vanilla)

- **Search** manga by title
- **Browse** by genre
- **Save** titles to a personal list (`localStorage`)
- **Track** your reading progress *(future)*

## Features (React)

- **Trending** manga on load
- **Search** by title with clear and empty input feedback
- **Browse** by genre
- **Detail modal** with score, chapters, genres, and status
- **Save and remove** titles to My List (`localStorage`, same key as vanilla)
- **My List** view with empty state

Toasts, skeleton loaders, and reading progress are vanilla only for now.

## Tech Stack

### Vanilla
- **HTML** for page structure
- **CSS** for styling and layout (flexbox, custom properties)
- **JavaScript** for dynamic rendering and app logic
- **Vitest** for unit tests for small helpers (repo root)
- **AniList API** for manga data

### React rebuild (`the-lantern-react/`)
- **React** + **TypeScript**
- **Vite** for local dev server and build tool
- **AniList API** for the same data source

## Getting Started

### Vanilla app
1. Clone the repository:
   ```bash
   git clone https://github.com/JamezM546/the-lantern.git
   ```
2. Open `index.html` in your browser (or use Live Server).

No build step required to use the app. To run the vanilla unit tests from this same folder:

```bash
npm install
npm test
```

See `TESTING.md` for the manual checklist and what those tests cover.

### React app
1. Go into the React folder:
   ```bash
   cd the-lantern-react
   ```
2. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```
3. Open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
```

## Roadmap

### Vanilla
- [x] Render manga cards from data
- [x] Card styling and layout
- [x] Live search via the AniList API
- [x] Save titles to a personal list


### React rebuild
- [x] Project setup (Vite + React + TypeScript)
- [x] Lantern layout and styles
- [x] AniList API helpers (trending, search, details)
- [x] Trending and search in the UI
- [x] Detail modal with save and remove
- [x] My List view
- [x] Genre browse


## Future ideas
- Reading progress on saved manga (vanilla)
- Toasts in the React app

## About

The Lantern grew out of a genuine desire for a simple, pleasant way to keep track of manga, built as much for learning as for use.
