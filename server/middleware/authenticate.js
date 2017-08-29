var {User} = require('./../db/models/users');


var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  //This is an Model Method--> Different from a Instance method foudn in user.js
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
}


module.exports = {authenticate};
