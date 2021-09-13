// Mongoose data models
const Exercise = require('../models/exercise');
const User = require('../models/user');

// You can POST to /api/users/:_id/exercises
// with form data description, duration, and optionally date.
// If no date is supplied, the current date will be used.
// The response returned will be the user object with the exercise fields added.

const findUser = async (req, res, next) => {
  const _id = req.params._id;
  await User.findById(_id).exec().then((user) => {
    if (!user) {
      const e = new Error(`User ${_id} not found.`);
      e.status = 404;
      return res.send(e.toString());
    }
  }).catch((e) => {
    if (e) return next(e);
  });
  next();
};

const createExercise = async (req, res, next) => {
  console.log('in createExercise');
  const newExercise = new Exercise({
    user: req.params._id,
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date,
  });

  const exercise = await newExercise.save().catch((e) => {
    console.log('error');
    next(e);
  });

  res.json({
    date: exercise.date_string,
    duration: exercise.duration,
    description: exercise.description,
  });

  // // res.json({
  // //   _id: user._id,
  // //   username: user.username,
  // //   date: exercise.date_string,
  // //   duration: exercise.duration,
  // //   description: exercise.description,
  // // });
  // }];
};
exports.addNewExercise = [
  findUser,
  createExercise,
];

