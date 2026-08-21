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

const TRENDING_QUERY = `
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
          query: TRENDING_QUERY,
        }),
      });

      const data = await response.json();
      return data.data.Page.media;
}



const SEARCH_QUERY = `
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

    //GraphQL query: where we ask AniList for the exact fields we want back
        //Getting API Data
        //Send the query to AniList as a POST (query + variables go in the body)
        const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            query: SEARCH_QUERY,
            variables: search_variables,
        }),
        });
        //Convert the raw response into a usable object
        const data = await response.json();
        //Dig into the response to reach the manga array
        return data.data.Page.media;
     
}