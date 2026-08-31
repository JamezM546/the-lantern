//Title, tagline, and the search bar
type HeroProps = {
    searchText: string;
    onSearchTextChange: (value: string) => void;
    onSearch: () => void;
    onClear: () => void;
}

function Hero({ searchText, onSearchTextChange, onSearch, onClear }: HeroProps) {
    return (
        <section className ="hero">
            <h1>TheLantern</h1>
            <p className="tagline">Your cozy corner for manga discovery!</p>
            <div className="search-bar">
                <input
                    id="search-input"
                    onChange={function (event) { onSearchTextChange(event.target.value); }}
                    onKeyDown={function (event) {
                        if (event.key === "Enter") {
                            onSearch();
                        }
                    }}
                    value={searchText}
                    type="text"
                    placeholder="What am I feeling today?"
                />
                <button id="search-btn" onClick={onSearch} type="button">Search</button>
                <button id="clear-btn" onClick={onClear} type="button">Clear</button>
            </div>
        </section>
    );
}

export default Hero;
