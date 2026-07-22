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