import API from "./api";

/**
 * txtai segmentation instance.
 */
class Segmentation extends API {
  /**
   * Segments text into semantic units.
   */
  async segment(text: string) {
    return await this.get<string>("segment", { text: text }).catch((e) => {
      throw e;
    });
  }

  /**
   * Segments text into semantic units.
   *
   * @param texts list of texts to segment
   * @return list of segmented text
   */
  async batchsegment(texts: string[]) {
    return await this.post<string[]>("batchsegment", texts).catch((e) => {
      throw e;
    });
  }
}

export default Segmentation;
