// Mongoose exercise model
const Exercise = require('../models/exercise');

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
    date: !date ? undefined : new Date(date),
  });

  res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.dateString,
    _id: user._id,
  });
};
