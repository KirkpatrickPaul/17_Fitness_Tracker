const router = require('express').Router();
const mongoose = require('mongoose');
const db = require('../models');

router
  .route('/workouts/:id?')

  .get((req, res) => {
    console.log('api/workouts GET');
    db.Workout.find({})
      .populate('exercises')
      .sort({ date: -1 })
      .then((sortedWorkouts) => {
        sortedWorkouts.forEach(function (workout) {
          workout.totals();
        });
        console.log(
          'sortedWorkouts[0].totalDuration :>> ',
          sortedWorkouts[0].totalDuration
        );
        if (req.params.id === 'range') {
          res.status(200).json(sortedWorkouts);
        }
        res.status(200).json(sortedWorkouts[0]);
      })
      .catch((err) => {
        console.log('err :>> ', err);
        res.status(500).json(err);
      });
  })

  .post((req, res) => {
    console.log('api/workouts POST');
    db.Workout.create(req.body)
      .then((newWorkout) => {
        res.status(201).json(newWorkout);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  })

  .put((req, res) => {
    console.log('api/workouts PUT');
    const workoutID = mongoose.Types.ObjectId(req.params.id);
    db.Exercise.create(req.body).then((newExercise) => {
      console.log('newExercise._id :>> ', newExercise.id);
      db.Workout.findOneAndUpdate(
        { _id: workoutID },
        { $push: { exercises: newExercise._id } },
        { returnNewDocument: true }
      )
        .populate('exercises')
        .then((updatedWorkout) => {
          console.log('updatedWorkout :>> ', updatedWorkout);
          res.status(200).json(updatedWorkout);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  });

module.exports = router;
