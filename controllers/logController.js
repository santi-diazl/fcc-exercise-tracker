// require mongoose models
const Exercise = require("../models/exercise");
const User = require("../models/user");

// Handle GET user's log of exercises
// You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
// The returned response will be the user object with a log array of all the exercises added. Each log item has the description, duration, and date properties.
// A request to a user's log (/api/users/:_id/logs) returns an object
// with a count property representing the number of exercises returned.

// You can add from, to and limit parameters to a /api/users/:_id/logs request
// to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.
exports.getUserLog = (req, res, next) => {};
