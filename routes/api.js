const router = require('express').Router();
const Workout = require('../models/workout.js');

router
  .route('api/workouts/:id?')

  .get((_req, res) => {
    Workout.find({})
      .sort({ date: -1 })
      .then((sortedWorkouts) => {
        if (req.params.id === 'range') {
          res.status(200).json(sortedWorkouts);
        }
        res.status(200).json(sortedWorkouts[0]);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  })

  .post((req, res) => {
    Workout.create(req.body)
      .then((newWorkout) => {
        res.status(201).json(newWorkout);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  })

  .put((req, res) => {
    const workoutID = req.params.id;
    Workout.findOneAndUpdate(
      { _id: workoutID },
      { $push: { ...req.body } },
      { new: true }
    )
      .then((updatedWorkout) => {
        res.status(200).json(updatedWorkout);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
