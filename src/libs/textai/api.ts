import { URLSearchParams } from "url";
import axios from "axios";
/**
 * Base class for interfacing with a remote textai service via REST API calls.
 */
export default class API {
  constructor(private url: string) {}

  /**
   *  Executes a get request
   */
  async get<T>(method: string, params?: Record<string, string>) {
    let url = `${this.url}/${method}`;
    if (params) {
      url += `?${new URLSearchParams(params)}`;
    }

    let res = await axios.get(url);

    // Validate response and return JSON
    if (res.status !== 200) {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
    return res.data;
  }

  async post<T>(
    method: string,
    params:
      | Record<string, string[] | string>
      | Record<string, string[] | string>[]
      | string[]
  ) {
    let url = `${this.url}/${method}`;

    // let res = await fetch(url, {
    //   method: "post",
    //   body: JSON.stringify(params),
    //   headers: { "content-type": "application/json" },
    // });

    const res = await axios.post(url, JSON.stringify(params), {
      headers: { "content-type": "application/json" },
    });

    // Validate response and return JSON
    if (res.status !== 200) {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
    return res.data;
  }
}
