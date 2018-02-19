const TwitterBotController = require('../controllers/twitter_bot_controller');

module.exports = (app) => {

  app.get('/api', TwitterBotController.greeting);
  app.post('/api/posts', TwitterBotController.create);
  app.delete('/api/posts/:id', TwitterBotController.delete);
  app.get('/api/posts', TwitterBotController.index);

};
