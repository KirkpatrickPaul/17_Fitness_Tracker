const mongoose = requre('mongoose');

const Schema = mongoose.Schema;

const cardioSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a name for your workout.'
  },

  type: {
    type: String,
    trim: true,
    required: 'Please enter the type of workout.'
  },

  distance: Number,

  duration: {
    type: Number,
    required: 'Please enter a duration for your workout.'
  }
});

const Cardio = mongoose.model('Cardio', cardioSchema);
module.exports = Cardio;
