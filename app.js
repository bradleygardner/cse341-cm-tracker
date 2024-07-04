const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerStatic.json');
const bodyParser = require("body-parser");
const passport = require("passport");

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json());


// passport config
// require('./passport')(passport);

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/', require('./routes'))

module.exports = app;