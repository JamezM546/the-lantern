
const searchBtn = document.querySelector("#search-btn")
const searchInput = document.querySelector("#search-input")


searchBtn.addEventListener("click", searchAction); 

 
function searchAction(){
    const manga_container = document.querySelector("#manga-list");
    const userText = searchInput.value.trim().toLowerCase();
    

    if(userText === ""){
        return manga_container.innerHTML = "";

    } else {

        const results = manga_data.filter(function(manga){
            return manga.title.toLowerCase().includes(userText);
        });

    
        let html = "";

        for(let i = 0; i < results.length; i++){
        
            html += `<div class="manga-card">
                        <h3>${results[i].title}</h3>
                        <p>${results[i].genre}</p>
                    </div>`

        }

        manga_container.innerHTML = html;
    }
}



//Make fake array manga data to use and match against
const manga_data = [
    {
        id: 1,
        title: "Blue Box",
        genre: "Romance",
        theme: "hard_work"
    },

    {
        id: 2,
        title: "Blue Spring Ride",
        genre: "Romance",
        theme: "self-discovery"
    },

    {
        id: 3,
        title: "My Hero Academia",
        genre: "Action",
        theme: "being a hero"
    }



];





