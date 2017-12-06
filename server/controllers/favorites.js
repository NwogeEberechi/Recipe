const Favorite = require('../models').Favorite;

module.exports = {
	addToFavorite(req, res) {
		const userId = req.body.userId; // use auth
		const recipeId = req.params.recipeId;

		Favorite.findOrCreate(
			{ where: {userId, recipeId}}
		)
		.spread((favorite, isCreated) => {
			if(isCreated) {
				return res.status(201).json({
					success: true,
					message: `Recipe with id: ${recipeId} added to favorite`
				});
			}

			return res.status(409).json({
				success: false,
				message: `You already added the recipe with id: ${recipeId}`
			});	
		})
		.catch(error => //res.status(501).json({
			//success: false,
			//message: `Unable to add recipe to favorite`,
			console.log(error)
		);
	},
};