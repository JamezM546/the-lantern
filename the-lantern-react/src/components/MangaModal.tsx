import type { MangaDetails } from "../api/anilist";
import { getDisplayTitle } from "../helpers/title";
import { formatStatus } from "../helpers/status";

//Popup with full manga info and a save button
type MangaModalProps = {
    manga: MangaDetails;
    isSaved: boolean;
    onClose: () => void;
    onSaveClick: () => void;
}

function MangaModal({ manga, isSaved, onClose, onSaveClick }: MangaModalProps) {
    const title = getDisplayTitle(manga.title);
    const niceStatus = formatStatus(manga.status);

    //AniList descriptions sometimes have HTML tags in them
    let descriptionText = "";
    if (manga.description) {
        descriptionText = manga.description.replace(/<[^>]*>/g, "");
    }

    let saveButtonText = "Save to My List";
    if (isSaved) {
        saveButtonText = "Remove from My List";
    }

    return (
        <div
            id="modal-background"
            onClick={function (event) {
                //User can click the background to close, not just the X
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="modal-content">
                <button id="close-modal" onClick={onClose} type="button">X</button>
                <h2>{title}</h2>
                <p><strong>Score:</strong> {manga.averageScore}</p>
                <p><strong>Chapters:</strong> {manga.chapters}</p>
                <p><strong>Genres:</strong> {manga.genres.join(", ")}</p>
                <p><strong>Status:</strong> {niceStatus}</p>
                <p>{descriptionText}</p>
                <button id="save-btn" onClick={onSaveClick} type="button">
                    {saveButtonText}
                </button>
            </div>
        </div>
    );
}

export default MangaModal;
