class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  setToken(token) {
    this._token = token;
    this._headers = {
      ...this._headers,
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    };
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateUserInfo(name, email) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    }).then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this._url}movies`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  saveMovie(movie) {
    return fetch(`${this._url}movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.thumbnail}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._checkResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._url}movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  register(name, email, password) {
    return fetch(`${this._url}signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._url}signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  checkToken = (jwt) => {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        Accept: 'applications/json',
        'Content-type': 'applications/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkResponse);
  };
}

const mainApi = new MainApi({
  url: 'https://api.nikolaev.movies.nomoredomains.icu/',
  // url: 'http://localhost:3500/',
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});

export default mainApi;
