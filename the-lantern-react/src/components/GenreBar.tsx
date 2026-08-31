//Genre filter buttons (same list as vanilla)
const GENRES = [
    "Action",
    "Romance",
    "Comedy",
    "Fantasy",
    "Horror",
    "Sci-Fi",
    "Slice of Life",
];

type GenreBarProps = {
    onGenreClick: (genre: string) => void;
}

function GenreBar({ onGenreClick }: GenreBarProps) {
    return (
        <div id="genre-bar">
            {GENRES.map(function (genre) {
                return (
                    <button
                        key={genre}
                        className="genre-btn"
                        onClick={function () { onGenreClick(genre); }}
                        type="button"
                    >
                        {genre}
                    </button>
                );
            })}
        </div>
    );
}

export default GenreBar;
