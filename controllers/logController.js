// Mongoose exercise model
const Exercise = require('../models/exercise');

// User controller
const userController = require('./userController');

const getUser = userController.getUser;
const noUserErr = userController.noUser;

// Converts date params into UTC strings for mongoose query if valid
// Otherwise returns empty string
const dateToUTC = (date) => {
  return new Date(date).toString() === 'Invalid Date' ?
        '' :
        new Date(date).toUTCString();
};

// Returns an object with user ID and from and to dates
// Used for mongoose query
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

// Adds exercises from query result into an array, for JSON response
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
  // await user query promise
  const user = await getUser(id);

  // no user found
  if (!user) {
    return next(noUserErr(id));
  }

  // deconstruction of params
  const {limit, from, to} = req.query;

  // query filter based on from and to dates params
  const queryFilter = getDateRange(id, dateToUTC(from), dateToUTC(to));

  // await exercise query promise
  const exercises = await Exercise
      .find(queryFilter, 'description duration date')
      .limit(Number(limit))
      .exec();

  // if successful, add results to array
  const exerciseLog = addToArray(exercises);

  res.json({
    username: user.username,
    count: exerciseLog.length,
    _id: id,
    log: exerciseLog,
  });
};
