var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// CREATE a user
router.post('/', function(req, res) {
  if (!isTherePasswords(req.body.user) || !matchPasswords(req.body.user)) {
    res.status(422).json({
      message: "Passwords do not match"
    });
    return;
  }

  var user = new User({
    name: req.body.user.name,
    username: req.body.user.username,
    passwordDigest: bcrypt.hashSync(req.body.user.password, 10)
  });

  user.save().then(function(userData) {
    var token = jwt.sign({ _id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: 60*60*24
      });
    res.json({
      user: userData,
      authToken: token
    });
  });
});


module.exports = router;

function isTherePasswords(obj){
  return (obj.password && obj.passwordConfirmation);
}

function matchPasswords(obj) {
  return (obj.password === obj.passwordConfirmation);
}
