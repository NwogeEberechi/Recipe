const recipesController = require('../controllers').recipes;
const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the recipes API!',
  }));

  app.post('/api/users/signup', usersController.signup);
  app.post('/api/recipes', recipesController.create);
  app.put('/api/recipes/:recipeId', recipesController.update);
  app.delete('/api/recipes/:recipeId', recipesController.destroy);
};