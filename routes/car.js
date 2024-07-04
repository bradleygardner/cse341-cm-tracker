const { ensureAuth } = require('../middleware/auth.js');
const routes = require('express').Router();
const cars = require('../controllers/cars.js');
const { saveCar } = require('../middleware/validator.js');

routes.get('/', cars.getAllCars);
routes.get('/:id', cars.getSingleCar);
routes.post('/', saveCar, cars.addCar);
routes.put('/:id', saveCar, cars.updateCar);
routes.delete('/:id', cars.deleteCar);

module.exports = routes;