import * as t from './constants'

export const requestStartGame = () => {
  return {
    type: t.GAME_START_IS_REQUESTED
  }
}

export const startGame = (id, word, maxAttempts) => {
  return {
    type: t.GAME_IS_STARTED,
    id: id,
    word: word,
    maxAttempts: maxAttempts
  }
}

export const finishGame = (success, score) => {
  return {
    type: t.GAME_IS_FINISHED,
    success: success,
    score: score
  }
}

export const updateGame = (success, word) => {
  return {
    type: t.GAME_UPDATE,
    success: success,
    word: word
  }
}
