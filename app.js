
const searchBtn = document.querySelector("#search-btn")
const searchInput = document.querySelector("#search-input")

//Run search on button click
searchBtn.addEventListener("click", searchAction); 

//Also run the search when Enter key is pressed in the input
searchInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        searchAction();
    }
});

 
async function searchAction(){
    const manga_container = document.querySelector("#manga-list");
    const userText = searchInput.value.trim();
    
    //The object 'variables' that GraphQL looks for. search: as the key, and userText as the value.
    const variables = { search: userText };

    //GraphQL query: where we ask AniList for the exact fields we want back
    const query = `
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
    

    if(userText === ""){
        return manga_container.innerHTML = `<p>No Results Found</p>`;

    } else {
        try {
            //Getting API Data
            //Send the query to AniList as a POST (query + variables go in the body)
            const response = await fetch("https://graphql.anilist.co", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    query: query, 
                    variables: variables 
                })
            });
            //Convert the raw response into a usable object
            const data = await response.json();
            //Dig into the response to reach the manga array
            const results = data.data.Page.media;
            


            let html = "";
            for(let i = 0; i < results.length; i++){
                //Prefer the English title, fall back to romaji if there's none
                const title = results[i].title.english || results[i].title.romaji;
                html += `<div class="manga-card">
                            <h3>${title}</h3>
                            <img src ="${results[i].coverImage.large}" alt="${title}">
                        </div>`

            }
            manga_container.innerHTML = html;
        }
        catch (error) {
            manga_container.innerHTML = `<p>Something went wrong. Please try again.</p>`;
        }
    }
}



//Make fake array manga data to use and match against
// const manga_data = [
//     {
//         id: 1,
//         title: "Blue Box",
//         genre: "Romance",
//         theme: "hard_work",
//         image: "https://placehold.co/180x260"
//     },

//     {
//         id: 2,
//         title: "Blue Spring Ride",
//         genre: "Romance",
//         theme: "self-discovery",
//         image: "https://placehold.co/180x260"
//     },

//     {
//         id: 3,
//         title: "My Hero Academia",
//         genre: "Action",
//         theme: "being a hero",
//         image: "https://placehold.co/180x260"
//     }



// ];





