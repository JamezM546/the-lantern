const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const manga_container = document.querySelector("#manga-list");
const statusMessage = document.querySelector("#status-message");

//Run search on button click
searchBtn.addEventListener("click", searchAction);

//Also run the search when Enter key is pressed in the input
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchAction();
  }
});

// * TRENDING SECTION
async function loadTrending() {
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
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadTrending();
});



// * SEARCHING SECTION
async function searchAction() {
  const userText = searchInput.value.trim();
  statusMessage.textContent = `Results for "${userText}"`;

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

  if (userText === "") {
    statusMessage.textContent = "Please enter something to search.";
    manga_container.innerHTML = "";
    return;
  } else {
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

      renderManga(results);
    } catch (error) {
      statusMessage.textContent = "Something went wrong. Please try again.";
    }
  }
}


// * RENDERING SECTION
function renderManga(results) {
  let html = "";
  for (let i = 0; i < results.length; i++) {
    //Prefer the English title, fall back to romaji if there's none
    const title = results[i].title.english || results[i].title.romaji;
    html += `<div class="manga-card">
                            <h3>${title}</h3>
                            <img src ="${results[i].coverImage.large}" alt="${title}">
                        </div>`;
  }
  manga_container.innerHTML = html;
}
