import controller from '../controllers';

const recipesController = controller.recipes;
const usersController = controller.users;
const reviewsController = controller.reviews;
const votesController = controller.votes;
const favController = controller.favorites;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the recipes API!',
  }));

  app.post('/api/users/signup', usersController.signup);
  app.get('/api/users/:userId', usersController.getUser);
  app.get('/api/users/:userId/recipes', recipesController.getUserRecipe);

  app.post('/api/recipes', recipesController.create);
  app.get('/api/recipes', recipesController.getAllRecipe);

  app.put('/api/recipes/:recipeId', recipesController.update);

  app.post('/api/recipes/:recipeId/reviews', reviewsController.postReview);
  app.get('/api/recipes/:recipeId/reviews', reviewsController.getReview);

  app.post('/api/recipes/:recipeId/favorites', favController.addToFavorite);
  app.get('/api/recipes/:userId/favorites', favController.getUserFavorite);
  app.delete('/api/recipes/:recipeId/favorites', favController.removeFromFav);

  app.post('/api/recipes/:recipeId/:vote', votesController.voteRecipe);

  app.delete('/api/recipes/:recipeId', recipesController.destroy);
};
