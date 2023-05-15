const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {dataSchema} = require("../model/dataModel");

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  data: [dataSchema]
});

// Pre 'save' middleware to bcrypt the password
userSchema.pre('save', function(next) {
      // Hash the password with the generated salt, 'this' refers to the user
      bcrypt.hash(this.password, SALT_WORK_FACTOR, function(err, hash) {
        if (err) return next(err);
        // Replace the plain password with the hashed one
        this.password = hash;
        return next();
    })
});

  module.exports = mongoose.model('User', userSchema);
