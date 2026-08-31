import { useEffect, useState } from 'react'
import { fetchTrending, fetchSearch, fetchDetails, fetchGenre, type Manga, type MangaDetails } from './api/anilist'
import { loadSavedManga, addToSavedList, removeFromSavedList, buildSavedItem } from './helpers/list'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GenreBar from './components/GenreBar'
import MangaGrid from './components/MangaGrid'
import MangaModal from './components/MangaModal'


function App() {
  //Whats on screen right now (trending, search results, or my list)
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [searchText, setSearchText] = useState("");
  const [statusMessage, setStatusMessage] = useState("Trending!");

  //Modal and saved list
  const [selectedManga, setSelectedManga] = useState<MangaDetails | null>(null);
  const [savedManga, setSavedManga] = useState<Manga[]>([]);
  const [currentPage, setCurrentPage] = useState<"home" | "mylist">("home");

  //Stop double clicks while details are loading
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  //Remember genre results so repeat clicks don't refresh
  const [genreCache, setGenreCache] = useState<Record<string, Manga[]>>({});

  //Load saved list from localStorage on startup
  useEffect(() => {
    setSavedManga(loadSavedManga());
  }, []);

  //Load trending as soon as the page opens
  useEffect(() => {
    async function loadTrending() {
      const results = await fetchTrending();
      setMangaList(results);
      setStatusMessage("Trending!");
    }
    loadTrending()
  }, [])


  // * SEARCHING SECTION
  async function searchAction(){
    const userText = searchText.trim();

    if(userText === ""){
      setStatusMessage("Please enter something to search.");
      setMangaList([]);
      return;
    }

    const results = await fetchSearch(userText);
    setMangaList(results);
    setStatusMessage("Results for " + userText);
    setCurrentPage("home");
  }

  async function clearSearch(){
    setSearchText("")
    setStatusMessage("Trending!")
    setCurrentPage("home");
    const results = await fetchTrending()
    setMangaList(results);
  }


  // * NAV SECTION
  async function goHome(){
    setCurrentPage("home");
    setSearchText("");
    setStatusMessage("Trending!");
    const results = await fetchTrending();
    setMangaList(results);
  }

  function openMyList(){
    setCurrentPage("mylist");
    setStatusMessage("My List");

    if (savedManga.length === 0) {
      setMangaList([]);
      return;
    }

    setMangaList(savedManga);
  }


  // * BROWSE BY GENRE
  async function browseGenre(genre: string){
    //Already loaded this genre? Use the saved copy.
    if (genreCache[genre]) {
      setStatusMessage(genre + " Manga");
      setMangaList(genreCache[genre]);
      setCurrentPage("home");
      return;
    }

    if (isLoadingList) return;
    setIsLoadingList(true);
    setStatusMessage("Loading...");

    try {
      const results = await fetchGenre(genre);

      if (!results || results.length === 0) {
        setStatusMessage("No " + genre + " manga found.");
        setMangaList([]);
        return;
      }

      setGenreCache(function (prev) {
        return { ...prev, [genre]: results };
      });
      setStatusMessage(genre + " Manga");
      setMangaList(results);
      setCurrentPage("home");
    } catch (error) {
      setStatusMessage("Something went wrong. Please try again in a moment.");
    } finally {
      setIsLoadingList(false);
    }
  }


  // * MANGA CARD DETAILS SECTION
  async function showDetails(id: number){
    if (isLoadingDetails) return;
    setIsLoadingDetails(true);

    try {
      const details = await fetchDetails(id);
      setSelectedManga(details);
      document.body.classList.add("no-scroll");
    } catch (error) {
      console.log("Error loading details:", error);
    } finally {
      setIsLoadingDetails(false);
    }
  }

  function closeModal(){
    setSelectedManga(null);
    document.body.classList.remove("no-scroll");
  }


  // * SAVED MANGA LIST (Save & Remove)
  function isAlreadySaved(id: number){
    return savedManga.some(function (item) {
      return item.id === id;
    });
  }

  function saveToList(){
    if (!selectedManga) return;

    if (isAlreadySaved(selectedManga.id)) {
      const updatedList = removeFromSavedList(savedManga, selectedManga.id);
      setSavedManga(updatedList);

      //If we are on My List, refresh the cards on screen too
      if (currentPage === "mylist") {
        setMangaList(updatedList);
      }
      return;
    }

    const itemToSave = buildSavedItem(selectedManga);
    const updatedList = addToSavedList(savedManga, itemToSave);
    setSavedManga(updatedList);
  }


  //Empty message only shows on My List when nothing is saved yet
  let listEmptyText = null;
  if (currentPage === "mylist" && savedManga.length === 0) {
    listEmptyText = "Your list is empty - save some manga to see them here!";
  }

  const mangaIsSaved = selectedManga
    ? isAlreadySaved(selectedManga.id)
    : false;

  return (
    <>
      <Navbar
        currentPage={currentPage}
        onHome={goHome}
        onMyList={openMyList}
      />

      <main className="main">
        <Hero
          searchText={searchText}
          onSearchTextChange={setSearchText}
          onSearch={searchAction}
          onClear={clearSearch}
        />

        <GenreBar onGenreClick={browseGenre} />

        <section className ="results">
          <h2 id="status-message">{statusMessage}</h2>
          <MangaGrid
            mangaList={mangaList}
            listEmptyText={listEmptyText}
            onCardClick={showDetails}
          />
        </section>
      </main>

      {selectedManga && (
        <MangaModal
          manga={selectedManga}
          isSaved={mangaIsSaved}
          onClose={closeModal}
          onSaveClick={saveToList}
        />
      )}

      <footer className="footer">Made with 🏮 by James</footer>
    </>
  )
}

export default App
