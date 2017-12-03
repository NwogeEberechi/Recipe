const votes = require('./votes');

module.exports ={
	voteRecipe(req, res) {
		const vote = req.params.vote;

		if(vote === 'upvote') {
			return votes.upvoteRecipe(req, res);
		}
		if(vote === 'downvote') {
			return votes.downvoteRecipe(req,res);
		}

		return res.status(400).json({
			message: `Votes not specified`
		});
	},
}