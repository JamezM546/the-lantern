import type { Manga } from "../api/anilist";

//Same key as the vanilla app so both versions can share saves
const LIST_KEY = "lantern_list";

//Load saved list on startup (or empty array if nothing saved yet)
export function loadSavedManga(): Manga[] {
    const stored = localStorage.getItem(LIST_KEY);
    if (!stored) {
        return [];
    }
    return JSON.parse(stored);
}

export function addToSavedList(savedManga: Manga[], manga: Manga): Manga[] {
    const alreadySaved = savedManga.some(function (item) {
        return item.id === manga.id;
    });

    if (alreadySaved) {
        return savedManga;
    }

    const updatedList = [...savedManga, manga];
    localStorage.setItem(LIST_KEY, JSON.stringify(updatedList));
    return updatedList;
}

export function removeFromSavedList(savedManga: Manga[], id: number): Manga[] {
    const updatedList = savedManga.filter(function (item) {
        return item.id !== id;
    });
    localStorage.setItem(LIST_KEY, JSON.stringify(updatedList));
    return updatedList;
}

//Only keep the fields we need for cards in My List
export function buildSavedItem(manga: Manga): Manga {
    return {
        id: manga.id,
        title: { english: manga.title.english, romaji: manga.title.romaji },
        coverImage: { large: manga.coverImage.large },
    };
}
