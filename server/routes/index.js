const recipesController = require('../controllers').recipes;
const usersController = require('../controllers').users;
const reviewsController = require('../controllers').reviews;
const votescontroller = require('../controllers').votes;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the recipes API!',
  }));

  app.post('/api/users/signup', usersController.signup);

  app.post('/api/recipes', recipesController.create);
  app.get('/api/recipes', recipesController.list);
  
  app.put('/api/recipes/:recipeId', recipesController.update);
  app.post('/api/recipes/:recipeId/reviews', reviewsController.postReview);
  
  app.post('/api/recipes/:recipeId/:vote', votescontroller.voteRecipe);

  app.delete('/api/recipes/:recipeId', recipesController.destroy);
};