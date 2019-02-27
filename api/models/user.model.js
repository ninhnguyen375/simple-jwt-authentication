const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  user_name: {
    type: String,
    trim: true,
    required: true,
  },
  user_email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
  hash_password: String,
});

module.exports = mongoose.model('User', userSchema);
