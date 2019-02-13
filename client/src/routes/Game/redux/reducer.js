import * as t from './constants'

const initialState = {
  loading: false,
  attempts: 0,
  id: null,
  maxAttemtps: 0,
  word: null,
  success: null,
  score: null // Should be in user
}

export default function reducer(state = initialState, action) {
  console.log('Game/redux/reducer', action)
  switch (action.type) {
    case t.GAME_START_IS_REQUESTED:
      return Object.assign({}, state, {loading: true})
    case t.GAME_IS_STARTED:
      return Object.assign({}, state, {
        loading: false,
        id: action.id,
        maxAttempts: action.maxAttempts,
        word: action.word
      })
    case t.GAME_IS_FINISHED:
      return Object.assign({}, state, {
        loading: false,
        success: action.success,
        score: action.score
      })
    case t.GAME_UPDATE:
      return Object.assign({}, state, {
        success: action.success,
        word: action.word
      })
    default:
      return state
    }
}
