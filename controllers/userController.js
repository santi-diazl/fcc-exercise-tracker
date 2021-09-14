// User model
const User = require('../models/user');

exports.getUser = getUser = async (id) => {
  const user = await User.findById(id).exec();
  return user;
};

exports.noUser = noUserErr = (id) => {
  const err = new Error(`User ${id} not found.`);
  err.status = 404;
  return err;
};

// You can POST to /api/users with form data username to create a new user.
// The returned response will be an object with username and _id properties.
// Handle new user request on POST
exports.postNewUser = async (req, res, next) =>{
  const newUser = new User({
    username: req.body.username});
  const user = await newUser.save();
  res.json({username: user.username, _id: user._id});
};

// You can make a GET request to /api/users to get an array of all users.
// Each element in the array is an object containing a user's username and _id.
// Handle get user list on GET
exports.getUserList = async (req, res, next) => {
  const allUsers = await User.find({}, 'username _id').exec();
  const userList = Array.from(allUsers);
  res.json(userList);
};
