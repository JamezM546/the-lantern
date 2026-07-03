document.addEventListener("input", function(event) {

    barAnimation(event);

});

const activeSearch = document.querySelector("#search-input")

function barAnimation(event){


    activeSearch.classList.add("pressed");

    setTimeout(function() {
        activeSearch.classList.remove("pressed");
    }, 100)

    const text = activeSearch.value;
    


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



const manga_container = document.querySelector("#manga-list");


let html = "";

for(let i = 0; i < manga_data.length; i++){
  
 html += `<div class="manga-card">
            <h3>${manga_data[i].title}</h3>
            <p>${manga_data[i].genre}</p>
        </div>`

   
   
   
}

manga_container.innerHTML = html;