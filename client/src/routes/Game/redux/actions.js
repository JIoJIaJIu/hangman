import * as t from './constants'

export const requestStartGame = () => {
    return {
        type: t.GAME_START_IS_REQUESTED
    }
}

export const startGame = () => {
    return {
        type: t.GAME_IS_STARTED
    }
}

export const finishGame = (success, score) => {
    return {
        type: t.GAME_IS_FINISHED,
        success: success,
        score: score
    }
}
