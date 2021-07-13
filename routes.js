const express = require("express");
const router = express.Router();

// require controllers
const exerciseController = require("./controllers/exerciseController");
const userController = require("./controllers/userController");
const logController = require("./controllers/logController");

// GET - user list
router.get("/api/users", userController.getUserList);
// POST - new user
router.post("/api/users", userController.addNewUser);

// POST - new exercise
router.post("/api/users/:_id/exercises", exerciseController.addNewExercise);

module.exports = router;
