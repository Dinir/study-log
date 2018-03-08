const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      // validator: value => validator.isEmail(value),
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  // since required tokens are *inside* of a property `tokens`,
  // it works with a user object without this property requested when making new user document.
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// overwrite a method to change what is sent back when
// mongoose handle the mongoose model converted into JSON
UserSchema.methods.toJSON = function() {
  const user = this;
  // from mongoose object to javascript object
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// this method will be available in all documents of a collection using this schema.
UserSchema.methods.generateAuthToken = function() {
  // refer to the document the schema is used for
  const user = this;
  const access = 'auth';
  const token = jwt.sign({
    _id: user._id.toHexString(),
    access,
  },
  'abc123'
  ).toString();

  user.tokens = user.tokens.concat([{access, token}]);

  // the token will be in reach in next `then()` chain outside of this method when the promise is fulfilled.
  return user.save().then(() => token);
};

// everything added under `.statics` will turn into model methods,
// while ones under `.methods` will turn into instance methods.
UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    // any data put inside of the parenthesis can be used in a `.catch()` call later.
    return Promise.reject();
  }

  // when finding a document by a nested field, you need to wrap the filed with quotes.
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;
  return User.findOne({email}).then(user => {
    if(user) {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if(res) {
            resolve(user);
          }
          reject();
        });
      });
    }
    return Promise.reject();
  });
};

// mongoose middleware
// this one will be executed whenever saving is gonna happen, before it happens.
UserSchema.pre('save', function(next) {
  const user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        // console.log(hash);
        // console.log(user.password);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};
