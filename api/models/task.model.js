const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  name: {
    type: String,
    default: new Date(),
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    default: 'pending',
  },
});

module.exports = mongoose.model('Tasks', taskSchema);
