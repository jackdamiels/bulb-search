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

    let res = await axios.get<T>(url);

    // Validate response and return JSON
    if (res.status !== 200) {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
    return res.data;
  }

  async post<T>(method: string, params: any) {
    let url = `${this.url}/${method}`;

    const res = await axios.post<T>(url, JSON.stringify(params), {
      headers: { "content-type": "application/json" },
    });

    // Validate response and return JSON
    if (res.status !== 200) {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
    return res.data;
  }
}
