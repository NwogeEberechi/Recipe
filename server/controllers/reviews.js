const Review = require('../models').Review;

module.exports = {
	postReview(req, res) {
		return Review
			.create({
				content: req.body.content,
				recipeId: req.params.recipeId,
				userId: req.body.userId, //get the userId through authentication
			})
			.then(review => res.status(200).send(review))
			.catch(error => res.status(400).send(error));
	},

};