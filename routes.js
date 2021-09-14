const express = require('express');
const router = express.Router();

// Composed function to wrap around async routes, if there is an error with
// async routes, it well be caught by Promise.catch(), with next function
// Being passed to it
// Shutout to David Sag of ITNEXT for elegant solution:
// (https://itnext.io/using-async-routes-with-express-bcde8ead1de8)
const asyncRoute = (route) => (req, res, next) =>
  Promise.resolve(route(req, res).catch(next));

// Controllers
const exerciseController = require('./controllers/exerciseController');
const userController = require('./controllers/userController');
const logController = require('./controllers/logController');

// POST - new user
router.post('/', asyncRoute(userController.postNewUser));
// GET - user list
router.get('/', asyncRoute(userController.getUserList));
// POST - exercise
router.post('/:_id/exercises', asyncRoute(exerciseController.postExercise));
// GET - exercise log
router.get('/:_id/logs', asyncRoute(logController.getUserLog));

module.exports = router;
