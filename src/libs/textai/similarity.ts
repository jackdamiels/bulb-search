import API from "./api";

export interface SimilarityResult {
  id: string;
  score: number;
}

/**
 * txtai similarity instance.
 */
class Similarity extends API {
  /**
   * Computes the similarity between query and list of text. Returns a list of
   * {id: value, score: value} sorted by highest score, where id is the index
   * in texts.
   *
   * @return list of {id: value, score: value}
   */
  async similarity(query: string, texts: string[]) {
    return await this.post<SimilarityResult>("similarity", {
      query: query,
      texts: texts,
    }).catch((e) => {
      throw e;
    });
  }

  /**
   * Computes the similarity between list of queries and list of text. Returns a list
   * of {id: value, score: value} sorted by highest score per query, where id is the
   * index in texts.
   *
   * @param queries queries text
   * @param texts list of text
   * @return list of {id: value, score: value} per query
   */
  async batchsimilarity(queries: string[], texts: string[]) {
    return await this.post<SimilarityResult[]>("batchsimilarity", {
      queries: queries,
      texts: texts,
    }).catch((e) => {
      throw e;
    });
  }
}

export default Similarity;
