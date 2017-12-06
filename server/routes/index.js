const recipesController = require('../controllers').recipes;
const usersController = require('../controllers').users;
const reviewsController = require('../controllers').reviews;
const votesController = require('../controllers').votes;
const favoritesController = require('../controllers').favorites;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the recipes API!',
  }));

  app.post('/api/users/signup', usersController.signup);
  app.get('/api/users/:userId', usersController.getUser);
  app.get('/api/users/:userId/recipes', recipesController.getUserRecipe);

  app.post('/api/recipes', recipesController.create);
  app.get('/api/recipes', recipesController.list);
  
  app.put('/api/recipes/:recipeId', recipesController.update);

  app.post('/api/recipes/:recipeId/reviews', reviewsController.postReview);
  app.get('/api/recipes/:recipeId/reviews', reviewsController.getReview);

  app.post('/api/recipes/:recipeId/favorites', favoritesController.addToFavorite);
  app.get('/api/recipes/:userId/favorites', favoritesController.getUserFavorite);
  app.delete('/api/recipes/:recipeId/favorites', favoritesController.removeFromFavorite);

  app.post('/api/recipes/:recipeId/:vote', votesController.voteRecipe);

  app.delete('/api/recipes/:recipeId', recipesController.destroy);
};