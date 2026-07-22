# The Lantern

A cozy corner for manga discovery. The Lantern is a manga tracker and discovery web app where you can search for titles, save the ones you're interested in, and track what you're reading — all wrapped in a warm dark-violet aesthetic.

This project is built as a hands-on learning vehicle. It started in **vanilla HTML, CSS, and JavaScript**, and is also being rebuilt in **React + TypeScript** to practice modern front-end tools.

## Two versions

| Version | Folder | Status |
|---|---|---|
| **Vanilla JS** | repo root (`index.html`, `app.js`, `styles.css`) | Main working app |
| **React + TypeScript** | `the-lantern-react/` | In progress (UI shell + AniList trending fetch) |

Both use the [AniList API](https://anilist.co/) (GraphQL) for manga data.

## Features (vanilla)

- **Search** manga by title
- **Browse** by genre
- **Save** titles to a personal list (`localStorage`)
- **Track** your reading progress *(planned)*

*(Some features are still in progress.)*

## Tech Stack

### Vanilla
- **HTML** — page structure
- **CSS** — styling and layout (flexbox, custom properties)
- **JavaScript** — dynamic rendering and app logic
- **AniList API** — manga data

### React rebuild (`the-lantern-react/`)
- **React** + **TypeScript**
- **Vite** — local dev server and build tool
- **AniList API** — same data source

## Getting Started

### Vanilla app
1. Clone the repository:
   ```bash
   git clone https://github.com/JamezM546/the-lantern.git
   ```
2. Open `index.html` in your browser (or use Live Server).

No build step required.

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

## Roadmap

### Vanilla
- [x] Render manga cards from data
- [x] Card styling and layout
- [x] Live search via the AniList API
- [x] Save titles to a personal list
- [ ] Reading progress tracking

### React rebuild
- [x] Project setup (Vite + React + TypeScript)
- [x] Lantern layout and styles
- [x] AniList `fetchTrending` helper
- [ ] Show trending cards in the UI
- [ ] Search, genres, My List

## About

The Lantern grew out of a genuine desire for a simple, pleasant way to keep track of manga — built as much for learning as for use.
