# Hangman

Backend is build with [loopback.io](https://loopback.io) and frontend with [React-Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit)

## How to use

### Requrements
* `nodejs >= 6`

### Usage
* `cd client && npm install && npm run build` - build the client
* `cd ../ && npm install` - install deps for the server
* `npm start` - run the server

#### Urls
* http://localhost:3000 - the Game
* http://localhost:3000/api - main API server
* http://localhost:3000/exporer - Swagger 

### How to play

* Authenticate
  ```
  curl -X POST -H "Content-Type:application/json" \
    -d '{"email": "guro.bokum@email.com", "password": "12345", "ttl": 1209600000}' \
    http://localhost:3000/api/players/login
  ```
  Use `id` as `token_id` bellow

* Create a game
  ```
  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' \
    -d '{}' 'http://localhost:3000/api/games?access_token=token_id'
  ```

* Answer


* Get info about the game
  ```
  curl -X GET --header 'Accept: application/json' \
  'http://localhost:3000/api/Games/1?access_token=token_id'
  ```
