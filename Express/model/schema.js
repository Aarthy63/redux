

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    // required: true
  }
},
 {collection: 'users'});

const User = mongoose.model('User', userSchema);
module.exports = User;