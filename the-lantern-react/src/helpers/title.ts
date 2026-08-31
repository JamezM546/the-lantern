//English title if we have it, otherwise romaji
export function getDisplayTitle(title: { english: string | null; romaji: string }){
    return title.english || title.romaji;
}
