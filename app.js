const searchBtn = document.querySelector("#search-btn");
const clearBtn = document.querySelector("#clear-btn");
const searchInput = document.querySelector("#search-input");
const manga_container = document.querySelector("#manga-list");
const statusMessage = document.querySelector("#status-message");
const modalBackground = document.querySelector("#modal-background");
const modalBody = document.querySelector("#modal-body");
const closeModal = document.querySelector("#close-modal");
const mylistLink = document.querySelector("#mylist-link");
const homeLink = document.querySelector("#home-link");
const genreBar = document.querySelector("#genre-bar");
const greetingTOD = document.querySelector("#greeting");
const toast = document.querySelector("#toast");

// * EVENT LISTENERS
//Run search or clear on button click
searchBtn.addEventListener("click", searchAction);
clearBtn.addEventListener("click", clearSearch);

//Also run the search when Enter key is pressed in the input
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchAction();
  }
});

//Load Trending as soon as Page Opens
document.addEventListener("DOMContentLoaded", () => {
  loadTrending();
});

closeModal.addEventListener("click", function () {
  modalBackground.classList.add("hidden"); //hide it again
  document.body.classList.remove("no-scroll");
});

mylistLink.addEventListener("click", function (event) {
  event.preventDefault();
  setActiveNav(mylistLink);
  statusMessage.textContent = "My List";
  checkMyList();
});

manga_container.addEventListener("click", function (event) {
  const card = event.target.closest(".manga-card");
  if (card) {
    showDetails(card.dataset.id);
  }
});

//User can click on modal background to exit and not just the 'X'
modalBackground.addEventListener("click", function (event) {
  if (event.target === modalBackground) {
    modalBackground.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  }
});

homeLink.addEventListener("click", function (event) {
  event.preventDefault();
  setActiveNav(homeLink);
  clearSearch();
});

genreBar.addEventListener("click", function (event) {
  if (event.target.classList.contains("genre-btn")) {
    const genre = event.target.textContent;
    browseGenre(genre);
  }
});


// * SAVED MANGA LIST (Save & Remove Functions)
//Load saved list on startup (or empty array if nothing saved yet)
let savedManga = JSON.parse(localStorage.getItem("lantern_list")) || [];

//Limit Requests
let isLoadingList = false;
let isLoadingDetails = false;

//Remeber genre results so repeat clicks don't refresh - caching
const genreCache = {};

function saveToList(manga) {
  const alreadySaved = savedManga.some(function (item) {
    return item.id === manga.id;
  });

  if (alreadySaved) {
    return;
  }

  savedManga.push(manga);
  localStorage.setItem("lantern_list", JSON.stringify(savedManga));

  if (statusMessage.textContent === "My List") {
    renderManga(savedManga);
  }
}

function removeFromList(id) {
  savedManga = savedManga.filter(function (item) {
    return item.id !== id;
  });
  localStorage.setItem("lantern_list", JSON.stringify(savedManga));
}

function clearSearch() {
  searchInput.value = "";
  statusMessage.textContent = "Trending!";
  loadTrending();
}

function checkMyList() {
  if (savedManga.length === 0) {
    manga_container.innerHTML =
      "<p>Your list is empty - save some manga to see them here!</p>";
    return;
  }
  renderManga(savedManga);
}

function renderSkeletons(count){
  let html = "";
  for(let i = 0; i < count; i++){
    html += `<div class="skeleton-card">
                <div class="skeleton-title"></div>
                <div class="skeleton-cover"></div>
              </div>`;
  }
  manga_container.innerHTML = html;
}

function setActiveNav(link){
  document.querySelectorAll(".nav-link").forEach(el => el.classList.remove("active"));
  link.classList.add("active");
}


// * TRENDING SECTION
async function loadTrending() {
  if (isLoadingList) return;
  isLoadingList = true;

  const trend_query = `
    query {
        Page(perPage: 10) {
            media(type: MANGA, sort: TRENDING_DESC) {
                id
                title { 
                    romaji
                    english 
                    }
                coverImage {
                    large
                    }
                }
            }
        }`;
  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: trend_query,
      }),
    });
    const data = await response.json();
    const results = data.data.Page.media;

    renderManga(results);
  } catch (error) {
    statusMessage.textContent = "Something went wrong. Please try again.";
  } finally {
    isLoadingList = false;
  }
}

// * SEARCHING SECTION
async function searchAction() {
  const userText = searchInput.value.trim();

  if (userText === "") {
    statusMessage.textContent = "Please enter something to search.";
    manga_container.innerHTML = "";
    return;
  }

  if (isLoadingList) return;
  isLoadingList = true;
  statusMessage.textContent = "Loading...";
  renderSkeletons(10);

  //The object 'variables' that GraphQL looks for. search: as the key, and userText as the value.
  const search_variables = { search: userText };

  //GraphQL query: where we ask AniList for the exact fields we want back
  const search_query = `
    query ($search: String) {
        Page(perPage: 10) {
            media(search: $search, type: MANGA, isAdult: false){
                id
                title {
                    romaji
                    english
                    }
                coverImage {
                    large 
                    }
                }
            }
        }`;

  try {
    //Getting API Data
    //Send the query to AniList as a POST (query + variables go in the body)
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: search_query,
        variables: search_variables,
      }),
    });
    //Convert the raw response into a usable object
    const data = await response.json();
    //Dig into the response to reach the manga array
    const results = data.data.Page.media;

    //Display Results Message
    statusMessage.textContent = `Results for "${userText}" (${results.length} found)`;

    renderManga(results);
  } catch (error) {
    statusMessage.textContent =
      "Something went wrong. Please try again in a moment.";
  } finally {
    isLoadingList = false;
  }
}

// * MANGA CARD DETAILS SECTION
async function showDetails(id) {
  if (isLoadingDetails) return;
  isLoadingDetails = true;

  const detail_variables = { id: id };

  const details_query = `
    query ($id: Int){
        Media(id: $id, type: MANGA){
            id
            title { romaji english }
            coverImage { large }
            description
            averageScore
            chapters
            genres
            status
            }
        }`;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: details_query,
        variables: detail_variables,
      }),
    });

    const data = await response.json();

    //Dig deeper into the manga object to get what we want
    const manga = data.data.Media;
    const title = manga.title.english || manga.title.romaji;

    //Conversion table to have status messages (easier to understand)
    const statusText = {
      RELEASING: "Ongoing",
      FINISHED: "Completed",
      NOT_YET_RELEASED: "Not yet released",
      CANCELLED: "Cancelled",
      HIATUS: "On hiatus",
    };

    const niceStatus = statusText[manga.status] || manga.status;

    modalBody.innerHTML = `
        <h2>${title}</h2>
        <p><strong>Score:</strong> ${manga.averageScore}</p>
        <p><strong>Chapters:</strong> ${manga.chapters}</p>
        <p><strong>Genres:</strong> ${manga.genres.join(", ")}</p>
        <p><strong>Status:</strong> ${niceStatus}</p>
        <p>${manga.description}</p>
        <button id="save-btn">Save to My List</button>
        `;

    const saveBtn = document.querySelector("#save-btn");

    //Is this manga already in the list?
    const isSaved = savedManga.some((item) => item.id === manga.id);
    if (isSaved) {
      saveBtn.textContent = "Remove from My List";
    } else {
      saveBtn.textContent = "Save to My List";
    }

    saveBtn.addEventListener("click", function () {
      const isSaved = savedManga.some((item) => item.id === manga.id);
      if (isSaved) {
        removeFromList(manga.id);
        saveBtn.textContent = "Save to My List";
        showToast("Removed from your list!");

        if (statusMessage.textContent === "My List") {
          checkMyList();
        }
      } else {
        const savedItem = {
          id: manga.id,
          title: { english: manga.title.english, romaji: manga.title.romaji },
          coverImage: { large: manga.coverImage.large },
        };
        saveToList(savedItem);
        saveBtn.textContent = "Remove from My List";
        showToast("Saved to your list!");
      }
    });

    modalBackground.classList.remove("hidden"); //show the modal
    document.body.classList.add("no-scroll");
  } catch (error) {
    console.log("Error loading details:", error);
  } finally {
    isLoadingDetails = false;
  }
}

// * BROWSE BY GENRE
async function browseGenre(genre) {
  //Already loaded this genre? Use the saved copy.
  if(genreCache[genre]) {
    statusMessage.textContent = `${genre} Manga`;
    renderManga(genreCache[genre]);
    return;
  }

  if (isLoadingList) return;
  isLoadingList = true;
  statusMessage.textContent = "Loading...";
  renderSkeletons(10);

  const genre_variables = { genre: genre };

  const genre_query = `
 query ($genre: String){
    Page(perPage: 10){
      media(genre: $genre, type: MANGA, sort: POPULARITY_DESC){
        id
        title { romaji english }
        coverImage { large }
      }
    }
  }`;
  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: genre_query,
        variables: genre_variables,
      }),
    });

    const data = await response.json();
    const results = data.data.Page.media;

    if (!results || results.length === 0) {
      statusMessage.textContent = `No ${genre} manga found.`;
      manga_container.innerHTML = "";
      return;
    }
    genreCache[genre] = results; //save for next time - cache
    statusMessage.textContent = `${genre} Manga`;
    renderManga(results);
  } catch (error) {
    statusMessage.textContent =
      "Something went wrong. Please try again in a moment.";
  } finally {
    isLoadingList = false;
  }
}

// * RENDERING SECTION
function renderManga(results) {
  let html = "";
  for (let i = 0; i < results.length; i++) {
    //Prefer the English title, fall back to romaji if there's none
    const title = results[i].title.english || results[i].title.romaji;
    html += `<div class="manga-card" data-id="${results[i].id}">
                            <h3>${title}</h3>
                            <img src ="${results[i].coverImage.large}" alt="${title}">
                        </div>`;
  }
  manga_container.innerHTML = html;
}


// * GREETING SECTION
const hour = new Date().getHours();
let greeting;
if(hour < 12) greeting = "Good morning! What are you reading today?";
else if(hour < 18) greeting = "Good afternoon! Find your next read!";
else if(hour < 23) greeting = "Good Evening, what are you reading tonight?";
else greeting = "Still up? Let's find something good!";
greetingTOD.textContent = greeting;

// * TOAST SECTION
let toastTimer;

function showToast(message){
  toast.textContent = message;
  toast.classList.remove("hidden");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.add("hidden");
  }, 3000);
}