const express = require("express");
const router = express.Router();

// require controllers
const exerciseController = require("./controllers/exerciseController");
const userController = require("./controllers/userController");
const logController = require("./controllers/logController");

// GET - user list
router.get("/", userController.getUserList);
// POST - new user
router.post("/", userController.addNewUser);

// POST - new exercise
router.post("/:_id/exercises", exerciseController.addNewExercise);

// GET - exercise log
router.get("/:_id/logs", logController.getUserLog);

module.exports = router;
