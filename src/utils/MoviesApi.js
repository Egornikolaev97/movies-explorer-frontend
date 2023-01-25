class MoviesApi {
    constructor({ url,headers }) {
        this._url = url;
        this._headers = headers;
    }

    checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(res.status);
        }
    }

    getAllMovies() {
        return fetch(`${this._url}beatfilm-movies`, {
          method: 'GET',
          headers: this._headers,
        })
        .then(this.checkResponse);
      }
}

const moviesApi = new MoviesApi({
    url: 'https://api.nomoreparties.co/',
    headers: {
        "content-type": "application/json",
      },
  });

export default moviesApi;
