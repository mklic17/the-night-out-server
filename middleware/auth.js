var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (isPreflight(req) || isLoggingInOrSigningUp(req)) {
    next();
    return;
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decodedPayload){
      if(!decodedPayload) {
        res.status(401).json({ message: 'Authentication required.'});
      }

      User.findOne({ _id: decodedPayload._id })
        .then(
          function(user) {
            if (user) {
              req.user = user;
              next();
            }
            else {
              res.status(401).json({ message: 'Authentication required. '});
            }
          });
    });
  }
  else {
    res.status(401).json({
      message: 'Authentication required'
    });
  }
}

function isPreflight(req) {
  return (req.method.toLowerCase() === 'options');
}

function isLoggingInOrSigningUp(req) {
  if (req.method.toLowerCase() !== 'post') {
    return false;
  }
  const loggingIn = req.originalUrl.includes('sessions');
  const signingUp = req.originalUrl.includes('users');
  return (loggingIn || signingUp);
}
