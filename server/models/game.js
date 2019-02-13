'use strict';

let _ = require('lodash');

module.exports = function(Game) {
  Game.input = function (id, letter, opts, cb) {
    console.log(id, letter);
    Game.findById(id)
    .then(game => {
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

        game.attempts += 1
        if (hasMatch) {
          game.state = letters;
        }

        console.log(game)
        game.save().then(game => {
          game.success = hasMatch;
          cb(null, game);
        })
      })
    })
    .catch(err => {
      cb(err);
    })
  }

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
      { arg: 'success', type: 'boolean' },
      { arg: 'state', type: 'array' }
    ]
  });
};
