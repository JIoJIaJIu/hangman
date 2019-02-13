import * as t from './constants'

const initialState = {
  active: true,
  attempts: 0,
  id: null,
  loading: false,
  maxAttemtps: 0,
  word: null,
  score: null, // Should be in user
  solved: null,
  success: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case t.GAME_START_IS_REQUESTED:
      return Object.assign({}, state, {loading: true})
    case t.GAME_IS_STARTED:
      return Object.assign({}, state, {
        active: true,
        score: null,
        success: null,
        id: action.id,
        loading: false,
        maxAttempts: action.maxAttempts,
        word: action.word
      })
    case t.GAME_IS_FINISHED:
      return Object.assign({}, state, {
        active: false,
        loading: false,
        score: action.score,
        solved: action.solved,
        success: null
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
