import models from '../models';

const Review = models.Review;

module.exports = {
  postReview(req, res) {
    return Review
      .create({
        content: req.body.content,
        recipeId: req.params.recipeId,
        userId: req.body.userId, // get the userId through authentication
      })
      .then(review => res.status(200).send(review))
      .catch(error => res.status(400).send(error));
  },

  getReview(req, res) {
    const recipeId = req.params.recipeId;

    return Review.findOne({ where: { recipeId } })
      .then((review) => {
        if (review) {
          return res.status(200).send(review);
        }
        return res.status(400).json({
          success: false,
          message: 'No review for recipe specified'
        });
      })
      .catch(error => res.status(500).send(error));
  },
};
