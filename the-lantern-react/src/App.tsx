import { useEffect, useState } from 'react'
import { fetchTrending, fetchSearch, type Manga } from './api/anilist'


function App() {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Trending!");

  useEffect(() => {
    async function load() {
      const results = await fetchTrending();
      setMangaList(results);
      setStatus("Trending!");
    }
    load()
  }, [])

  async function handleSearch(){
    if(!query.trim()){
      return;
    }
    const results = await fetchSearch(query.trim());
    setMangaList(results);
    setStatus("Results for " + query)
  }



  
  return (
    <>
      <nav className="navbar">
        <a href="#">Home</a>
        <a href="#">Browse</a>
        <a href="#">My List</a>
      </nav>

      <main className="main">
        <section className ="hero">
          <h1>TheLantern</h1>
          <p className="tagline">Your cozy corner for manga discovery!</p>
          <div className="search-bar">
            <input 
              onChange={(event) => setQuery(event.target.value)} 
              onKeyDown={(event) => { if(event.key === "Enter") handleSearch() }}
              value={query} type="text" 
              placeholder="What am I feeling today?">
            </input>
            <button onClick={handleSearch} type="button">Search</button>
            <button onClick={async () => { 
              setQuery("") 
              setStatus("Trending!")
              const results = await fetchTrending()
              setMangaList(results)
              }} 
              type="button">Clear</button>
          </div>
        </section>

        <section className="results">
          <h2>{status}</h2>
          <div id="manga-list">
            {mangaList.map((manga) => {
              const title = manga.title.english || manga.title.romaji
              return (
                <div className="manga-card" key={manga.id}>
                  <h3>{title}</h3>
                  <img src={manga.coverImage.large} alt={title}/>
                  </div>
              )
            })}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
