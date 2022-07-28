import API from "./api";

/**
 * txtai transcription instance.
 */
class Transcription extends API {
  /**
   * Transcribes audio files to text.
   *
   */
  async transcribe(file: string) {
    return await this.get("transcribe", { file: file }).catch((e) => {
      throw e;
    });
  }

  /**
   * Transcribes audio files to text.
   *
   */
  async batchtranscribe(files: string[]) {
    return await this.post("batchtranscribe", files).catch((e) => {
      throw e;
    });
  }
}

export default Transcription;
