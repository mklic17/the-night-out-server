var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// Login

router.post('/', function(req, res) {
  User.findOne({
    username: req.body.user.username
  })
  .then(
    function(user) {
      if (user) {
        user.authenticate(req.body.user.password, function(isMatch) {
          if (isMatch) {
            var token = jwt.sign({ _id: user._id },
              process.env.JWT_SECRET,
              {
                expiresIn: 60*60*24
              });
            res.json({
              user,
              authToken: token
            });
          }
          else {
            res.status(401).json({ message: 'Could not access account '})
          }

        });
      }
    });
});

module.exports = router;
