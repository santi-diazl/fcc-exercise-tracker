const express = require('express');
const router = express.Router();

const asyncRoute = (route) => (req, res, next = console.error) =>
  Promise.resolve(route(req, res).catch(next));

// Controllers
const exerciseController = require('./controllers/exerciseController');
const userController = require('./controllers/userController');
const logController = require('./controllers/logController');

// GET - user list
router.get('/', asyncRoute(userController.getUserList));
// POST - new user
router.post('/', asyncRoute(userController.postNewUser));
// POST - exercise
router.post('/:_id/exercises', asyncRoute(exerciseController.postExercise));
// GET - exercise log
router.get('/:_id/logs', asyncRoute(logController.getUserLog));

module.exports = router;
