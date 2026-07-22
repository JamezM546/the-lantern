function App() {
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
          <div id="manga-list"></div>
        </section>
      </main>
    </>
  )
}

export default App
