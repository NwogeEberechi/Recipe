const Recipe = require('../models').Recipe;

module.exports = {
	upvoteRecipe(req, res) {
		const id = req.params.recipeId;
		const userId = req.body.userId
		
		Recipe.findById(id)
			.then(recipe => {
				if(recipe) {
					upvotes = recipe.upvotes;
					downvotes = recipe.downvotes;
					if (downvotes.includes(userId)){
						const index = downvotes.indexOf(userId);
						downvotes.splice(index, 1);
					}
					if(upvotes.includes(userId)){
						return res.status(409).json({
							success: false,
							message: `Recipe with id: ${id} already upvoted by you`
						});
					}
					upvotes.push(userId);
					Recipe.update(
						{upvotes, downvotes},
						{where: {id} }
					)
					.then(result => 
						res.status(201).json({
							success: true,
							message: `Recipe with id: ${id} upvoted`
						})
					)
					.catch(error => 
						res.status(500).json({
							Success: false,
							message: `We were unable to register your vote for Recipe with id: ${id}, please try again`
						})
					);
					return 
				}
			return res.status(400).json({
				success: false,
				message: `Recipe with id: ${id} does not exist`
				});
			})
			.catch(error => 
				res.status(500).json({
					Success: false,
					message: `We were unable to register your vote for Recipe with id: ${id}, please try again`
				})
			);
	},

	downvoteRecipe(req, res) {
		const id = req.params.recipeId;
		const userId = req.body.userId
		
		Recipe.findById(id)
			.then(recipe => {
				if(recipe) {
					upvotes = recipe.upvotes;
					downvotes = recipe.downvotes;
					if (upvotes.includes(userId)){
						const index = upvotes.indexOf(userId);
						upvotes.splice(index, 1);
					}
					if(downvotes.includes(userId)){
						return res.status(409).json({
							success: false,
							message: `Recipe with id: ${id} already downvoted by you`
						});
					}

					downvotes.push(userId);
					Recipe.update(
						{upvotes, downvotes},
						{where: {id} }
					)
					.then(result => 
						res.status(201).json({
							success: true,
							message: `Recipe with id: ${id} downvoted`
						})
					)
					.catch(error => 
						res.status(500).json({
							Success: false,
							message: `We were unable to register your vote for Recipe with id: ${id}, please try again`
						})
					)
					return
				}
			return res.status(400).json({
				success: false,
				message: `Recipe with id: ${id} does not exist`
				});
			})
			.catch(error => 
				res.status(500).json({
					Success: false,
					message: `We were unable to register your vote for Recipe with id: ${id}, please try again`
				})
			);
	},
};

