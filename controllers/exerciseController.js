// require mongoose models
const Exercise = require("../models/exercise");
const User = require("../models/user");

// require express validator
const { body, validationResult } = require("express-validator");

//You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date.
// If no date is supplied, the current date will be used.
// The response returned will be the user object with the exercise fields added.

exports.addNewExercise = [
  //validate and sanitize
  body(":_id", "ID # must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Please enter a brief description of your exercise.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("duration")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Please enter a duration in total minutes.")
    .isInt()
    .withMessage("Please enter a whole number."),
  body("Date", "Invalid Date entered")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  // process request
  (req, res, next) => {
    const errors = validationResult(req);
    // validation errors not empty
    if (!errors.isEmpty()) {
      return res.send(errors);
    }
    const exercise = new Exercise({
      user: req.body[":_id"],
      description: req.body.description,
      duration: req.body.duration,
      date: !req.body.date ? undefined : req.body.date,
    });

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
          date: exercise.date,
          duration: exercise.duration,
          description: exercise.description,
        });
      });
    });
  },
];
