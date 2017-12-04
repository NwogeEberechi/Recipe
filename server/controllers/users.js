const User = require('../models').User;

module.exports = {
  signup(req, res) {
    return User
      .create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },

  getUser(req, res) {
    const userId = req.params.userId;

    return User.findById(userId)
    .then(user => {
      if(user) {
        res.status(200).json({
          user
        })
      }
      return res.status(400).json({
        success: false,
        message: `User not found`
      });
    })
    .catch(error => res.status(500).send(error));
  },
};