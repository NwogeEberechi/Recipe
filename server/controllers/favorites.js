const Favorite = require('../models').Favorite;
const Recipe = require('../models').Recipe;
const User = require('../models').User;

module.exports = {
	addToFavorite(req, res) {
		const userId = req.body.userId; // use auth
		const recipeId = req.params.recipeId;

		Recipe.findById(recipeId)
		.then(recipe => {
			if(!recipe) {
				return res.status(404).json({
					success: false,
					message: `Recipe with id: ${recipeId} does not exist`
				});
			}
		})
		.catch(error => res.status(500).json({
			success: false,
			message: `Error finding recipe`
		}));		


		Favorite.findOrInitialize({ 
				where: { 
					userId, 
					recipeId 
				} 
			})
			.spread((favorite, IsCreated) => {
				if (IsCreated) {
					Favorite
						.create({
							recipeId: recipeId,
							userId: userId
						})
						.then(result =>
							res.status(201).json({
								success: true,
								message: `Recipe with id: ${recipeId} added to favorite`
					}));
					return 
				}
				return res.status(409).json({
					success: false,
					message: `You already added the recipe with id: ${recipeId} to favorites`
				});
			})
			.catch(error => res.status(400).send(error));
	},

	getUserFavorite(req, res) {
		const userId = req.params.userId; // use auth

		Favorite.findAll({ 
			where: {userId},
			include: [
          		{ model: Recipe },
          		{ model: User, attributes: ['name', 'updatedAt'] }
        	]
		})
		.then(userFavorites => {
			if (userFavorites.length !==0) {
				return res.status(200).json({
					success: true,
					message: `User Favorites found`,
					userFavorites
				});
			}
			return res.status(404).json({
				success: false,
				message: `You have not added recipes to your favorites`
			});
		})
		.catch(error => res.status(501).json({
			success: false,
			message: `Error finding your favorite recipes`
		}));

	},
};