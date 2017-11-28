const Upvote = require('../models').Upvote;
const Downvote = require('../models').Downvote;
const Recipe = require('../models').Recipe;

module.exports = {
	upvoteRecipe(req, res) {
		return Upvote
			.create({
				recipeId: req.params.recipeId,
				userId: req.body.userId,
			})
			.then(upvote => res.status(201).send(upvote))
			.catch(error => res.status(400).send(error));
	},
};