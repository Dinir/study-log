const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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

const User = mongoose.model('User', UserSchema);

module.exports = {User};
