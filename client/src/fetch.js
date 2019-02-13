import fetch from 'cross-fetch'
import _ from 'lodash'

export default function localFetch() {
    let path = arguments[0];
    path = `http://localhost:3000/api${path}`;
    let args = _.slice(Array.prototype.call(arguments), 1)
    let args = [path, ...args];

    return fetch.apply(null, args);
}
