const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: { type: Date, default: Date.now },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exercise'
    }
  ],
  totalWeight: Number,
  totalSets: Number,
  totalReps: Number,
  totalDistance: Number,
  totalDuration: Number
});

workoutSchema.methods.totals = function () {
  let weight = 0;
  let sets = 0;
  let reps = 0;
  let distance = 0;
  let duration = 0;

  this.exercises.forEach((exercise) => {
    weight += exercise.weight;
    sets += exercise.sets;
    reps += exercise.reps;
    distance += exercise.distance;
    duration += exercise.duration;
  });

  this.totalWeight = weight;
  this.totalSets = sets;
  this.totalReps = reps;
  this.totalDistance = distance;
  this.totalDuration = duration;
};

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
