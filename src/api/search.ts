const BASE_URL = "http://localhost:8000";

export interface SearchResult {
  title: string;
  slug: string;
  id: string;
  description: string;
  text: string;
  value: string;
}

export const search = async (
  term: string,
  limit = 2
): Promise<SearchResult[]> => {
  const query = `select text, score, title, slug, description from txtai where similar('${term}') and score >= 0.15`;
  const result = (
    await fetch(`${BASE_URL}/search?query=${query}&limit=${limit}`).then(
      (res) => res.json()
    )
  ).data as SearchResult[];

  return result;
};
