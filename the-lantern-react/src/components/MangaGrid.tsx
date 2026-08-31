import type { Manga } from "../api/anilist";
import MangaCard from "./MangaCard";

//Shows all the manga cards, or an empty list message
type MangaGridProps = {
    mangaList: Manga[];
    listEmptyText: string | null;
    onCardClick: (id: number) => void;
}

function MangaGrid({ mangaList, listEmptyText, onCardClick }: MangaGridProps) {
    if (listEmptyText) {
        return <p className="empty-message">{listEmptyText}</p>;
    }

    return (
        <div id="manga-list">
            {mangaList.map(function (manga) {
                return (
                    <MangaCard
                        key={manga.id}
                        manga={manga}
                        onCardClick={onCardClick}
                    />
                );
            })}
        </div>
    );
}

export default MangaGrid;
