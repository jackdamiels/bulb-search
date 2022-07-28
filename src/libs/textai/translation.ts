import API from "./api";

/**
 * txtai translation instance.
 */
class Translation extends API {
  /**
   * Translates text from source language into target language.
   *
   * @param text text to translate
   * @param target target language code, defaults to "en"
   * @param source source language code, detects language if not provided
   * @return translated text
   */
  async translate(text: string, target: string, source: string) {
    let params = { text: text } as any;
    if (target) {
      params.target = target;
    }
    if (source) {
      params.source = source;
    }

    return await this.get("translate", params).catch((e) => {
      throw e;
    });
  }

  /**
   * Translates text from source language into target language.
   *
   * @param texts list of text to translate
   * @param target target language code, defaults to "en"
   * @param source source language code, detects language if not provided
   * @return list of translated text
   */
  async batchtranslate(texts: string[], target: string, source: string) {
    let params = { texts: texts } as any;
    if (target) {
      params.target = target;
    }
    if (source) {
      params.source = source;
    }

    return await this.post("batchtranslate", texts).catch((e) => {
      throw e;
    });
  }
}

export default Translation;
