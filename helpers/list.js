export function addToList(savedManga, manga, storage){
    const alreadySaved = savedManga.some(function (item) {
        return item.id === manga.id;
      });
    
      if (alreadySaved) {
        return;
      }
    
      savedManga.push(manga);
      storage.setItem("lantern_list", JSON.stringify(savedManga));
      
}