const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: { type: Date, default: Date.now },
  exercises: [
    {
      name: {
        type: String,
        trim: true,
        required: 'Please enter a name for your workout.'
      },

      type: {
        type: String,
        trim: true,
        required: 'Please enter a type of workout.'
      },

      weight: Number,

      sets: Number,

      reps: Number,

      distance: Number,

      duration: Number
    }
  ]
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
