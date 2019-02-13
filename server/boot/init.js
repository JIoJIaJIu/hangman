'use strict';
let _ = require('lodash');

module.exports = function (app) {
  app.models.Player.create([
    {
      email: 'guro.bokum@email.com',
      password: '12345',
      emailVerified: true,
      score: 100
    }, {
      email: 'admin@email.com',
      password: '12345',
      emailVerified: true,
      score: 0
    }
  ]);

  app.models.Word.create([
    { value: '3dhubs' },
    { value: 'marvin' },
    { value: 'filament' },
    { value: 'print' },
    { value: 'filament' },
    { value: 'order' },
    { value: 'layer' }
  ]);

  customizeGameCRUD(app);
}

function customizeGameCRUD(app) {
  let Game = app.models.Game;
  let Word = app.models.Word;
  let gameCreate = Game.create;
  Game.create = function(data, opts, cb) {
    Word.count()
      .then(count => {
        let wordId = _.random(0, count - 1); 
        return app.models.Word.findById(wordId)
      })
      .then(word => {
        let game = {
          word_id: word.id,
          state: _.map(word.value, () => ('')),
          player_id: opts.accessToken.userId
        }

        return gameCreate.call(Game, game, opts, cb)
      })
      .catch(err => {
        cb(err)
      })
  }
}
