const {User} = require('../models/user');

// a middleware function you can use on the routes to make them private
const authenticate = (req, res, next) => {
  const token = req.header('x-auth');

  User.findByToken(token).then(user => {
    if(user) {
      req.user = user;
      req.token = token;
      return next();
    }
    return Promise.reject();
  }).catch(e => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
