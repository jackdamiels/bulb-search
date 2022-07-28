import API from "./api";

export interface ExtractQue {
  name: string;
  query: string;
  question: string;
  snippet: string;
}
/**
 * txtai extractor instance.
 */
class Extractor extends API {
  /**
   * Extracts answers to input questions.
   *
   * @param queue list of {name: value, query: value, question: value, snippet: value}
   * @param texts list of text
   * @return list of {name: value, answer: value}
   */
  async extract(queue: ExtractQue, texts: string[]) {
    return await this.post("extract", { queue: queue, texts: texts }).catch(
      (e) => {
        throw e;
      }
    );
  }
}

export default Extractor;
