
const searchBtn = document.querySelector("#search-btn")
const searchInput = document.querySelector("#search-input")


searchBtn.addEventListener("click", searchAction); 

searchInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        searchAction();
    }
});

 
async function searchAction(){
    const manga_container = document.querySelector("#manga-list");
    const userText = searchInput.value.trim();
    

    if(userText === ""){
        return manga_container.innerHTML = `<p>No Results Found</p>`;

    } else {
        try {
            //Getting API Data
            //Request manga matching the search term (returns raw response)
            const response = await fetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(userText)}`);
            //Convert the raw response into a usable object (has pagination + data)
            const data = await response.json();
            //Grab just the manga array out of the response object
            const results = data.data;


            let html = "";
            for(let i = 0; i < results.length; i++){
                html += `<div class="manga-card">
                            <h3>${results[i].title}</h3>
                            <img src ="${results[i].images.jpg.image_url}" alt="${results[i].title}">
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





