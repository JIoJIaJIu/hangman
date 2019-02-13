import f from 'cross-fetch'
import _ from 'lodash'

const REST_ENDPOINT = 'http://localhost:3000/api'
let token = null;

export function setToken(t) {
  token = t
}

export default {
  createGame: () => {
    return fetch(`/games?access_token=${token}`, {
      method: 'POST'
    });
  },
  inputGame: (id, letter) => {
    return fetch(`/games/${id}/input?access_token=${token}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `letter=${letter}`
    })
  },
  login: (username, password) => {
    return fetch(`/players/login`, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `email=${username}&password=${password}`,
      method: 'POST'
    })
  },
  logout: () => {
    return fetch(`/players/logout?access_token=${token}`, {
      method: 'POST'
    })
  }
}

function fetch() {
  let path = arguments[0];
  path = `${REST_ENDPOINT}${path}`;
  let args = _.slice(arguments ,1)
  args = [path, ...args];

  return f.apply(null, args);
}
