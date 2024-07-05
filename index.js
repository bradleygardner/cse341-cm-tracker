const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require("./app");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerStatic.json');

// load config
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => console.log('connected'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});