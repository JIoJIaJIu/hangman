import * as t from './constants'

const initialState = {
  isLogin: false,
  username: null,
  token: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case t.USER_LOGIN:
      return {
        isLogin: true,
        username: action.username,
        token: action.token
      }
    case t.USER_LOGOUT:
      return {
        isLogin: false,
        username: null,
        token: null
      }
    default:
      return state
  }
}
