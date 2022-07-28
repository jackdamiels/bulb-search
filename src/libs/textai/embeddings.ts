import API from "./api";

/**
 * txtai embeddings instance.
 */
export default class Embeddings extends API {
  /**
   * Finds documents in the embeddings model most similar to the input query. Returns
   * a list of {id: value, score: value} sorted by highest score, where id is the
   * document id in the embeddings model.
   *
   * @param limit maximum results (defaults to 10)
   * @return list of {id: value, score: value}
   */
  async search(query: string, limit = 10) {
    return await this.get("search", { query: query, limit: `${limit}` }).catch(
      (e) => {
        throw e;
      }
    );
  }

  /**
   * Finds documents in the embeddings model most similar to the input queries. Returns
   * a list of {id: value, score: value} sorted by highest score per query, where id is
   * the document id in the embeddings model.
   *
   * @param queries queries text
   * @param limit maximum results (defaults to 10)
   * @return list of {id: value, score: value} per query
   */
  async batchsearch(queries: string[], limit = 10) {
    return await this.post("batchsearch", {
      queries: queries,
      limit: `${limit}`,
    }).catch((e) => {
      throw e;
    });
  }

  /**
   * Adds a batch of documents for indexing.
   *
   * @param documents list of {id: value, text: value}
   */
  async add(documents: { id: string; text: string }[]) {
    await this.post("add", documents).catch((e) => {
      throw e;
    });
  }

  /**
   * Builds an embeddings index for previously batched documents.
   */
  async index() {
    await this.get("index").catch((e) => {
      throw e;
    });
  }

  /**
   * Runs an embeddings upsert operation for previously batched documents.
   */
  async upsert() {
    await this.get("upsert").catch((e) => {
      throw e;
    });
  }

  /**
   * Deletes from an embeddings index. Returns list of ids deleted.
   *
   * @param ids list of ids to delete
   * @return ids deleted
   */
  async delete(ids: string[]) {
    return await this.post<number[]>("delete", ids).catch((e) => {
      throw e;
    });
  }

  /**
   * Total number of elements in this embeddings index.
   *
   * @return number of elements in embeddings index
   */
  async count() {
    return await this.get<number>("count").catch((e) => {
      throw e;
    });
  }

  /**
   * Computes the similarity between query and list of text. Returns a list of
   * {id: value, score: value} sorted by highest score, where id is the index
   * in texts.
   *
   * @param texts list of text
   * @return list of {id: value, score: value}
   */
  async similarity(query: string, texts: string[]) {
    return await this.post<{ id: string; score: string }[]>("similarity", {
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
  async batchsimilarity(queries: string, texts: string[]) {
    return await this.post("batchsimilarity", {
      queries: queries,
      texts: texts,
    }).catch((e) => {
      throw e;
    });
  }

  /**
   * Transforms text into an embeddings array.
   *
   * @param text input text
   * @return embeddings array
   */
  async transform(text: string) {
    return await this.get("transform", { text: text }).catch((e) => {
      throw e;
    });
  }

  /**
   * Transforms list of text into embeddings arrays.
   *
   * @param texts list of text
   * @return embeddings array
   */
  async batchtransform(texts: string[]) {
    return await this.post("batchtransform", texts).catch((e) => {
      throw e;
    });
  }
}
