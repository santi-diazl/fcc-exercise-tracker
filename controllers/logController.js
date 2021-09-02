// Exercise and User Models
const Exercise = require("../models/exercise");
const User = require("../models/user");

// Handle GET user's log of exercises
// You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
// The returned response will be the user object with a log array of all the exercises added. Each log item has the description, duration, and date properties.
// A request to a user's log (/api/users/:_id/logs) returns an object
// with a count property representing the number of exercises returned.

// You can add from, to and limit parameters to a /api/users/:_id/logs request
// to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.
// GET user's exercise log: GET /api/users/:_id/logs?[&from][&to][&limit]
// [ ] = optional
// from, to = dates (yyyy-mm-dd); limit = number
exports.getUserLog = (req, res, next) => {
  User.findById(req.params["_id"], (err, user) => {
    if (err) return next(err);
    const { limit, from, to } = req.query;
    // convert to UTC string if valid date
    let fromTime =
      new Date(from).toString() === "Invalid Date"
        ? ""
        : new Date(from).toUTCString();
    let toTime =
      new Date(to).toString() === "Invalid Date"
        ? ""
        : new Date(to).toUTCString();

    // filter object for query
    const filter = { user: user._id };

    if (fromTime) {
      filter.date = {};
      filter.date["$gte"] = fromTime;
    }
    if (toTime) {
      if (filter.hasOwnProperty("date")) {
        filter.date["$lte"] = toTime;
      } else {
        filter.date = {};
        filter.date["$lte"] = toTime;
      }
    }

    Exercise.find(filter, "description duration date")
      .limit(Number(limit))
      .exec((err, exercises) => {
        if (err) return next(err);
        const exerciseArr = Array.from(exercises).map((exercise) => {
          return {
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date_string,
          };
        });
        res.json({
          _id: user._id,
          username: user.username,
          count: exerciseArr.length,
          log: exerciseArr,
        });
      });
  });
};
