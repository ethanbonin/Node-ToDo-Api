const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true, // Makes sure that the email doesn't get duplicated
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token : {
      type: String,
      required: true
    }
  }]
});

//This allows you to choose the only things that should be seen when returning to the SERVER
//obviously you don't want the server token and and what not shown
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};


//Allows you to add instance methods
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign(
    {
      _id: user._id.toHexString(),
      access: access
    }, //Secret key
      'abc123');


  //This save the User Model currently. BUT not to the server. So you have
  //to call save()
  user.tokens.push({
    access: access,
    token: token
  });

  //So you can chain the promise;
  return user.save().then(() => {
    return token;
  });
};


var User = mongoose.model('User', UserSchema);

module.exports = {
  User: User,
}
