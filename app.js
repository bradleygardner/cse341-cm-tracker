const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoStore = require("connect-mongo");
const passport = require("passport");
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerStatic.json');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport);

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// CORS (if needed)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

module.exports = app;
