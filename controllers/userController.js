// require mongoose models
const Exercise = require("../models/exercise");
const User = require("../models/user");

// require express validator
const { body, validationResult } = require("express-validator");

// You can POST to /api/users with form data username to create a new user.
// The returned response will be an object with username and _id properties.
// Handle new user request on POST
exports.addNewUser = [
  // validate and sanitize
  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Please enter a username."),
  // process request
  (req, res, next) => {
    const newUser = new User({
      username: req.body.username,
    });
    newUser.save((err, data) => {
      if (err) return console.error(err);
      res.json({ _id: data._id, username: data.username });
    });
  },
];

// You can make a GET request to /api/users to get an array of all users.
// Each element in the array is an object containing a user's username and _id.
// Handle get user list on GET
exports.getUserList = (req, res, next) => {
  User.find({}, "username _id", (err, data) => {
    if (err) return console.error(err);
    res.json(Array.from(data));
  });
};
