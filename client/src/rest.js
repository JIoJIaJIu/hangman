import f from 'cross-fetch'
import _ from 'lodash'

const REST_ENDPOINT = 'http://localhost:3000/api'

export default {
    createGame: () => {
        return fetch('/game', {});
    },
    input: (id, letter) => {
        return fetch(`/game/${id}/input`, {letter: letter})
    }
}

function fetch() {
    let path = arguments[0];
    path = `${REST_ENDPOINT}${path}`;
    let args = _.slice(arguments ,1)
    args = [path, ...args];

    return f.apply(null, args);
}
