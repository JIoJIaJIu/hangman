'use strict';

let _ = require('lodash');

module.exports = function(Game) {

  Game.remoteMethod(
    'input', {
    accepts: [
      { arg: 'id', type: 'number', required: true },
      { arg: 'letter', required: true, type: 'string' },
      { arg: 'options', type: 'object', http: 'optionsFromRequest' }
    ],
    http: {
      path: '/:id/input'
    },
    returns: [
      { arg: 'id', type: 'number' },
      { arg: 'success', type: 'boolean' },
      { arg: 'input', type: 'array' },
      { arg: 'state', type: 'state' },
      { arg: 'attempts', type: 'number' }
    ]
  });

  Game.remoteMethod(
    'finish', {
      accepts: [
        { arg: 'id', type: 'number', required: true }
      ],
      http: {
        path: '/:id/finish'
      },
      returns: [
        { arg: 'id', type: 'number' },
        { arg: 'solved', type: 'boolean' },
        { arg: 'score', type: 'number' }
      ]
  });

  Game.input = function (id, letter, opts, cb) {
    Game.findById(id)
    .then(game => {
      if (!game.active) {
        throw new Error("Game is not active anymore");
      }

      if (game.attempts >= game.maxAttempts)
        throw new Error("Your attempts have been finished");

      game.word.get()
      .then(word => {
        let letters = game.state;
        let hasMatch = false
        _.each(word.value, (w, i) => {
          if ( w === letter ) {
            hasMatch = true;
            letters[i] = w;
          }
        });

        if (hasMatch) {
          game.state = letters;
        } else {
          game.attempts += 1
        }

        return game.save().then(game => {
          cb(null, game.id, hasMatch, game.input, game.state, game.attempts);
        })
      })
    })
    .catch(err => {
      cb(err);
    })
  }

  Game.finish = function (id, cb) {
    Game.findById(id, {include: 'player'})
    .then(game => {
      if (!game.active) {
        throw new Error("Game is not active anymore");
      }

      game.active = false;
      let solved = false;
      if (_.join(game.state) === game.word) {
        solved = true;
      }

      game.save()
      .then(game => {
        return game.player.get()
      })
      .then(player => {
        if (solved) {
          player.score += 25
        } else {
          player.score -= 25
        }
        return player.save()
      })
      .then(player => {
        cb(null, game.id, solved, player.score);
      })
    })
    .catch(err => {
      cb(err);
    })
  }
};
