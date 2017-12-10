const Recipe = require('../models').Recipe;
const Search = require('./search');

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
          //userId: modify here through authentication to get the
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

  getAllRecipe(req, res) {
    if(req.query.ingredients) {
      return Search.searchByIngredients(req, res);
    } else if (req.query.search) {
      return Search.searchAll(req, res);
    }else if (req.query.sort === 'upvotes' && req.query.order === 'des') {
      return Search.mostUpvotes(req, res);
    }else {
    return Recipe
      .findAll()
      .then(recipes => res.status(200).send(recipes))
      .catch(error => res.status(400).send(error));
    }
  },

  getUserRecipe(req, res) {
    const userId = req.params.userId // use auth

    Recipe.findAll(
      { where: {userId} }
    )
    .then(recipes => {
      if (recipes.length !== 0) {
        return res.status(201).json({
          success: true,
          message: `User Recipes Found`,
          recipes
        });
        return this;
      }
      return res.status(404).json({
        success: false,
        message: `No User stored Recipe found`
      });
    })
    .catch(error => res.status(501).json({
      success: false,
      message: `Unable to Get User Recipes`
    }));
  },
};