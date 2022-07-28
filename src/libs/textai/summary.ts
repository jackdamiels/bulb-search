import API from "./api";

/**
 * txtai summary instance.
 */
class Summary extends API {
  /**
   * Runs a summarization model against a block of text.
   */
  async summary(text: string, minlength: number, maxlength: number) {
    let params = { text: text } as any;
    if (minlength) {
      params.minlength = minlength;
    }
    if (maxlength) {
      params.maxlength = maxlength;
    }

    return await this.get<string>("summary", params);
  }

  /**
   * Runs a summarization model against a block of text.
   */
  async batchsummary(texts: string[], minlength: number, maxlength: number) {
    let params = { texts: texts } as any;
    if (minlength) {
      params.minlength = minlength;
    }

    if (maxlength) {
      params.maxlength = maxlength;
    }

    return await this.post<string>("batchsummary", params).catch((e) => {
      throw e;
    });
  }
}

export default Summary;
