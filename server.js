// require modules
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const router = require("./routes");

// mount middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mongoose Configuration
const mongoose = require("mongoose");
const MONGO_URI = process.env["MONGO_URI"];

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// routing
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.use("/api/users", router);

// listener
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
