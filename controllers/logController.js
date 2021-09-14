// Exercise and User Models
const Exercise = require('../models/exercise');

// Exercise controller
const userController = require('./userController');

// Handle GET user's log of exercises
// You can make a GET request to /api/users/:_id/logs
// to retrieve a full exercise log of any user.
// The returned response will be the user object with a log array of all the exercises added.
// Each log item has the description, duration, and date properties.
// A request to a user's log (/api/users/:_id/logs) returns an object
// with a count property representing the number of exercises returned.

// You can add from, to and limit parameters to a /api/users/:_id/logs request
// to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format.
// limit is an integer of how many logs to send back.
// GET user's exercise log: GET /api/users/:_id/logs?[&from][&to][&limit]
// [ ] = optional
// from, to = dates (yyyy-mm-dd); limit = number

const getUser = userController.getUser;
const noUserErr = userController.noUser;

const dateToUTC = (date) => {
  return new Date(date).toString() === 'Invalid Date' ?
        '' :
        new Date(date).toUTCString();
};

const getDateRange = (id, from, to) => {
  const dateRange = {user: id};

  if (from) {
    dateRange.date = {};
    dateRange.date['$gte'] = from;
  }
  if (to) {
    if (from) {
      dateRange.date['$lte'] = to;
    } else {
      dateRange.date = {};
      dateRange.date['$lte'] = to;
    }
  }

  return dateRange;
};

const addToArray = (exercises) => {
  const arr = Array.from(exercises).map((exercise) => {
    return {
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.dateString,
    };
  });
  return arr;
};

exports.getUserLog = async (req, res, next) => {
  const id = req.params['_id'];
  const user = await getUser(id);

  if (!user) {
    return next(noUserErr(id));
  }

  const {limit, from, to} = req.query;

  const queryFilter = getDateRange(id, dateToUTC(from), dateToUTC(to));

  const exercises = await Exercise
      .find(queryFilter, 'description duration date')
      .limit(Number(limit))
      .exec();

  const exerciseLog = addToArray(exercises);

  res.json({
    username: user.username,
    count: exerciseLog.length,
    _id: id,
    log: exerciseLog,
  });
};
