const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


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


//This is a model Method!
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;


  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    // return new Promse((resolve, reject) => {
    //     reject();
    // })

    //Same Thing
    return Promise.reject();
  };

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

};

//Run the code before we save to the database;
//You NEED to call next!
//This is a middleware function from Mongoose
UserSchema.pre('save', function(next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash
          next();
      });
    });

  } else {
    next();
  }
});


var User = mongoose.model('User', UserSchema);

module.exports = {
  User: User,
}
