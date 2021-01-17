const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a name for your exercis.'
  },

  type: {
    type: String,
    trim: true,
    required: 'Please enter a type of exercise.'
  },

  weight: Number,

  sets: Number,

  reps: Number,

  distance: Number,

  duration: Number
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
