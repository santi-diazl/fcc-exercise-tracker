// require mongoose models
const User = require("../models/user");

// You can POST to /api/users with form data username to create a new user.
// The returned response will be an object with username and _id properties.
// Handle new user request on POST
exports.addNewUser = (req, res, next) => {
    const newUser = new User({
      username: req.body.username,
    });
    newUser.save((err, user) => {
      if (err) return console.error(err);
      res.json({username: user.username, _id: user._id.toString()});
      // console.log(`New user created was ${user}`);
    });
  };


// You can make a GET request to /api/users to get an array of all users.
// Each element in the array is an object containing a user's username and _id.
// Handle get user list on GET
exports.getUserList = (req, res, next) => {
  User.find({}, "username _id", (err, data) => {
    if (err) return console.error(err);
    res.json(Array.from(data));
  });
};
