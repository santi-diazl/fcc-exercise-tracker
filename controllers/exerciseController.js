// Mongoose data models
const Exercise = require('../models/exercise');

// You can POST to /api/users/:_id/exercises
// with form data description, duration, and optionally date.
// If no date is supplied, the current date will be used.
// The response returned will be the user object with the exercise fields added.

// User controller
const userController = require('./userController');

const getUser = userController.getUser;

const noUserErr = userController.noUser;

const saveExercise = async (e) => {
  const newEx = await new Exercise(e).save();
  return newEx;
};

exports.postExercise = async (req, res, next) => {
  const id = req.params._id;
  const date = req.body.date;
  const user = await getUser(id);

  if (!user) {
    return next(noUserErr(id));
  }
  const exercise = await saveExercise({
    user: req.params._id,
    description: req.body.description,
    duration: req.body.duration,
    date: !date ? undefined : date,
  });

  res.json({
    _id: user._id,
    username: user.username,
    date: exercise.date_string,
    duration: exercise.duration,
    description: exercise.description,
  });
};
