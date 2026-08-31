export type Manga = {
    id: number
    title: {
        romaji: string
        english: string | null
    }
    coverImage: {
        large: string
    }
}

//Extra fields we only need when the detail modal is open
export type MangaDetails = Manga & {
    description: string | null
    averageScore: number | null
    chapters: number | null
    genres: string[]
    status: string
}


// * TRENDING SECTION
const trend_query = `
query {
    Page(perPage: 10) {
        media(type: MANGA, sort: TRENDING_DESC) {
            id
            title { romaji english }
            coverImage { large }
            }
        }
    }
`

export async function fetchTrending(): Promise<Manga[]> {
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
      return data.data.Page.media;
}


// * SEARCHING SECTION
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


export async function fetchSearch(userText: string): Promise<Manga[]>{
   
    const search_variables = { search: userText };

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
        const data = await response.json();
        return data.data.Page.media;
     
}


// * MANGA CARD DETAILS SECTION
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


export async function fetchDetails(id: number): Promise<MangaDetails>{

    const detail_variables = { id: id };

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
        return data.data.Media;
}


// * BROWSE BY GENRE
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


export async function fetchGenre(genre: string): Promise<Manga[]>{

    const genre_variables = { genre: genre };

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
        return data.data.Page.media;
}
