import Axios from "axios";

const apiConfig = {
  url: "http://localhost:3000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
};

class ApiBuilder {
  constructor() {
    this._timeout = apiConfig.timeout;
    this._headers = apiConfig.headers;
  }

  static create() {
    return new ApiBuilder();
  }

  get() {
    this._method = "GET";
    return this;
  }

  post() {
    this._method = "POST";
    return this;
  }

  delete() {
    this._method = "DELETE";
    return this;
  }

  put() {
    this._method = "PUT";
    return this;
  }

  url(url) {
    this._url = apiConfig.url + url;
    return this;
  }

  timeout(timeout) {
    this._timeout = timeout;
    return this;
  }

  data(data) {
    this._data = data;
    return this;
  }

  headers(headers) {
    this._headers = {
      ...this._headers,
      ...headers
    };
    return this;
  }

  auth() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    this._headers = {
      ...this._headers,
      Authorization: storedUser.token
    };
    return this;
  }

  params(params) {
    this._params = params;
    return this;
  }

  async build() {
    try {
      const response = await Axios({
        method: this._method,
        headers: this._headers,
        url: this._url,
        data: this._data,
        timeout: this._timeout,
        params: this._params
      });

      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default ApiBuilder;
