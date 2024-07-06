const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require("./app");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerStatic.json');
const session = require('express-session');
const MongoStore = require("connect-mongo");
const passport = require('passport');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: './config/config.env' });

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => console.log('connected'));
// Passport config
require('./config/passport')(passport);

// Connect to MongoDB
connectDB()

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

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
