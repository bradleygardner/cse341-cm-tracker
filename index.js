const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerStatic.json');
const passport = require("passport");

// load config
dotenv.config();
 
// passport config
// require('./passport')(passport);

const app = express();

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

mongoose.connect(process.env.MONGODB_URI);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});