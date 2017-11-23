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
  update(req, res) {
    return Recipe
      .find({
        where:{
          id: req.params.recipeId,
          //userId: modify here through authentication to get the part
          // particular user recipe to be modified
        },
      })
      .then(recipe => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe not found',
          });
        }

        return recipe
          .update({
            name: req.body.name || recipe.name,
            ingredients: req.body.ingredients || recipe.ingredients,
            direction: req.body.direction || recipe.direction,
          })
          .then(updatedRecipe => res.status(200).send(updatedRecipe))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Recipe
      .find({
        where:{
          id: req.params.recipeId,
          //userId: modify here through authentication to get the part
          // particular user recipe to be modified
        },
      })
      .then(recipe => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe not found',
          });
        }

        return recipe
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Recipe
      .findAll()
      .then(recipes => res.status(200).send(recipes))
      .catch(error => res.status(400).send(error));
  },
};