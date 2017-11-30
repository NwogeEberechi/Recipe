const Upvote = require('../models').Upvote;
const Downvote = require('../models').Downvote;
const Recipe = require('../models').Recipe;

module.exports = {
	upvoteRecipe(req, res) {
		const recipeId = req.params.recipeId;
		const userId = req.body.userId;

		//check if the user already downvoted the same recipe
		Downvote
			.findOne({
				attributes: ['id'],
				where: {
					recipeId,
					userId
				}
			})
			.then((downvote) => {
				if (downvote) {
					downvote
						.destroy({
							where: {
								recipeId,
								userId
							}
						})
						.then(() => {
							Recipe
								.findOne({
									where: {
										id: recipeId
									}
								})
								.then((recipe) => {
									recipe.decrement('downvotes');
								});
						});
				}
			});

		Upvote
			.findOrInitialize({ 
				where: { 
					userId, 
					recipeId 
				} 
			})
			.spread((upvote, created) => {
				if (created) {
					Upvote
						.create({
							recipeId: recipeId,
							userId: userId
						}).then(() => {
							Recipe
								.findOne({
								where: {
									id: recipeId
								}
						})
						.then((recipe) => {
							recipe.increment('upvotes'); 
						});
					});
					return res.status(201).json({
							success: true,
							message: `Recipe with id: ${recipeId} upvoted`
					});
				}

				return res.status(409).json({
					success: false,
					message: `Recipe with id: ${recipeId} already upvoted by you`
				});
			})
			.catch(error => res.status(400).send(error));
	},
};