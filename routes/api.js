const router = require('express').Router();
const mongoose = require('mongoose');
const db = require('../models');

router
  .route('/workouts/:id?')

  .get((req, res) => {
    db.Workout.find({})
      .populate('exercises')
      .sort({ date: -1 })
      .then((sortedWorkouts) => {
        sortedWorkouts.forEach(function (workout) {
          workout.totals();
        });
        if (req.params.id === 'range') {
          res.status(200).json(sortedWorkouts);
        } else {
          res.status(200).json(sortedWorkouts[0]);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  })

  .post((req, res) => {
    db.Workout.create(req.body)
      .then((newWorkout) => {
        res.status(201).json(newWorkout);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  })

  .put((req, res) => {
    const workoutID = mongoose.Types.ObjectId(req.params.id);
    db.Exercise.create(req.body).then((newExercise) => {
      db.Workout.findOneAndUpdate(
        { _id: workoutID },
        { $push: { exercises: newExercise._id } },
        { returnNewDocument: true }
      )
        .populate('exercises')
        .then((updatedWorkout) => {
          res.status(200).json(updatedWorkout);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    });
  });

module.exports = router;
