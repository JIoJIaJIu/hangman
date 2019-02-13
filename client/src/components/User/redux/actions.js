import * as t from './constants'

export const login = (username, token) => {
  return {
    type: t.USER_LOGIN,
    username: username,
    token: token
  }
}

export const logout = () => {
  return {
    type: t.USER_LOGOUT
  }
}
