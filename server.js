// Required modules
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');
const morgan = require('morgan');
const errHandler = require('./errorHandler');
const compression = require('compression');
const helmet = require('helmet');

// Mount middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('tiny'));
app.use(compression()); // Compress all routes
app.use(helmet());

// Mongoose Configuration
const mongoose = require('mongoose');
const MONGO_URI = process.env['MONGO_URI'];

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes

// Main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API
app.use('/api/users', router);

// Error handling
app.use(errHandler.errorHandler);

// Listener
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
