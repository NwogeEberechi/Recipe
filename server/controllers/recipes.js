const Recipe = require('../models').Recipe;

module.exports = {
  create(req, res) {
    return Recipe
      .create({
        name: req.body.name,
        ingredients: req.body.ingredients,
        direction: req.body.direction,
        userId: req.body.userId,
      })
      .then(recipe => res.status(201).send(recipe))
      .catch(error => res.status(400).send(error));
  },
};