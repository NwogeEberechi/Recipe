const Recipe = require('../models').Recipe;
const User = require('../models').User;

module.exports = {
	searchByIngredients(req, res) {
    	const ingredients = req.query.ingredients.split(' ');

    	const query = ingredients.map(item => ({
      		ingredients: { $iLike: `%${item}%` } }));

    Recipe
      .findAll({
        where: {
          $or: query
        },
        include: [
          { model: User, attributes: ['name', 'updatedAt'] }
        ]
      })
      .then((result) => {
        if (result.length !==0) {
          return res.status(200).json({
            success: true,
            message: 'Recipes Found',
            recipe: result
          });
        }

        return res.status(404).json({
          success: true,
          message: 'No Recipe found',
        });
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Unable to search recipes' }));
  },

  searchAll(req, res) {
  	const searchString = req.query.search;
  	let foundRecipes;

  	//search recipe
  	Recipe.findAll({
  		where: {
  			$or: [
  				{ name: {$iLike: `%${searchString}%`} },
  				{ ingredients: {$iLike: `%${searchString}%`} }
  			]
  		},
  		include: [
  			{ model: User, attributes: ['name', 'updatedAt'] }
  		]
  	})
  	.then(recipe => {
  		foundRecipes = recipe;
  	})
  	.then(() => {
  		User.findAll({
  			attributes: ['name'],
  			where: {
  				$or: [
  					{ name: {$ilike: `%${searchString}%`} },
  					{ username: {$ilike: `%${searchString}%`} },
  					{ email: {$ilike: `%${searchString}%`} }
  				]
  			},
  			include: [
  				{ model: Recipe}
  			] 
  		})
  		.then(user => {
  			recipes = foundRecipes.concat(user);
  			if (recipes.length !==0) {
	  			return res.status(200).json({
	  			success: true,
	  			message: `Recipes found`,
	  			recipes
	  			});
  			}

  			return res.status(404).json({
  				success: true,
  				message: `No recipes found`
  			});
  		});
  	})
  	.catch(error => res.status(500).json({
  		success: false,
  		message: `unable to search`
  	}));
  },

  mostUpvotes(req, res) {
  	Recipe.findAll({
  		order: [
  			['upvotes', 'DESC']
  		]
  	})
  	.then(recipe => {
  		if (recipe.length !==0) {
  			return res.status(200).json({
  				success: true,
  				message: `Recipes found`,
  				recipe
  			});
  		}

  		return res.status(404).json({
  			success: true,
  			message: `Rcipes not found`
  		});

  	})
  	.catch(error => res.status(500).json({
  		success: false,
  		message: `Unable to find recipe`
  	}));
  },
};