import * as t from './constants'
import { injectReducer } from '../../../store/reducers'

const initialState = {
    loading: false,
    attempts: 0,
    maxAttemtps: 0,
    word: null,
    success: null,
    score: null // Should be in user
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case t.GAME_START_IS_REQUESTED:
            return Object.assign({}, state, {loading: true})
        case t.GAME_IS_STARTED:
            return Object.assign({}, state, {
                loading: false,
                word: action.word
            })
        case t.GAME_IS_FINISHED:
            return Object.assign({}, state, {
                loading: false,
                success: action.success,
                score: action.score
            })
        default:
            return state
    }
}
