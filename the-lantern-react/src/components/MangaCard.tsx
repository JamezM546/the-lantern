import type { Manga } from "../api/anilist";
import { getDisplayTitle } from "../helpers/title";

//One manga cover card. Clicking it opens the detail modal.
type MangaCardProps = {
    manga: Manga;
    onCardClick: (id: number) => void;
}

function MangaCard({ manga, onCardClick }: MangaCardProps) {
    const title = getDisplayTitle(manga.title);

    return (
        <div
            className="manga-card"
            onClick={function () { onCardClick(manga.id); }}
        >
            <h3>{title}</h3>
            <img src={manga.coverImage.large} alt={title} />
        </div>
    );
}

export default MangaCard;
