// require mongoose models
const Exercise = require("../models/exercise");
const User = require("../models/user");

//You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date.
// If no date is supplied, the current date will be used.
// The response returned will be the user object with the exercise fields added.

exports.addNewExercise = [
  // process request
  (req, res, next) => {
    const exercise = new Exercise({
      user: req.body[":_id"],
      description: req.body.description,
      duration: req.body.duration,
      date: !req.body.date ? undefined : req.body.date,
    });

    console.log(`exercise information: ${exercise}`);

    User.findById(req.body[":_id"], (err, user) => {
      if (err) return next(err);
      if (!user) {
        let err = new Error("User not found.");
        err.status = 404;
        return next(err);
      }
      // now we can save exercise document
      exercise.save((err, exercise) => {
        if (err) {
          return next(err);
        }
        res.json({
          _id: exercise.user._id,
          username: user.username,
          date: exercise.date_string,
          duration: exercise.duration,
          description: exercise.description,
        });
      });
    });
  },
];
