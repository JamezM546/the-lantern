# The Lantern (React)

React + TypeScript rebuild of The Lantern. See the root `README.md` for the full project overview.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Structure

```text
src/
  api/anilist.ts       AniList GraphQL fetch helpers
  helpers/             title, status, and list utilities
  components/          Navbar, Hero, GenreBar, MangaCard, MangaGrid, MangaModal
  App.tsx              main app state and handlers
```

## Scope

This version covers trending, search, genre browse, detail modal, and My List with `localStorage`. Toasts live in the vanilla app only.
