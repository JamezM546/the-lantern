import { useEffect, useState } from 'react'
import { fetchTrending, type Manga } from './api/anilist'


function App() {
  const [mangaList, setMangaList] = useState<Manga[]>([])

  useEffect(() => {
    async function load() {
      const results = await fetchTrending();
      setMangaList(results);
    }
    load()
  }, [])
  
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
            <input type="text" placeholder="What am I feeling today?"></input>
            <button type="button">Search</button>
            <button type="button">Clear</button>
          </div>
        </section>

        <section className="results">
          <h2>Trending!</h2>
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
