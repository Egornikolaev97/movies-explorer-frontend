class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    this._token = null
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  setToken(token) {
    this._token = token;
    this._headers = {
      ...this._headers,
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  };

  updateUserInfo(name, email) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, email})
    }).then(this._checkResponse);
  }

  register(name, email, password) {
    return fetch(`${this._url}signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, email, password})
    }).then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._url}signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    }).then(this._checkResponse);
  }

  checkToken = (jwt) => {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        Accept: "applications/json",
        "Content-type": "applications/json",
        Authorization: `Bearer ${jwt}`,
      }
    })
    .then(this._checkResponse);
  }
}

  const mainApi = new MainApi({
  url: 'http://localhost:3500/',
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});

export default mainApi;
