const { ensureAuth } = require('../middleware/auth.js');
const routes = require('express').Router();
const cars = require('../controllers/cars.js');
const { saveCar } = require('../middleware/validator.js');

routes.get('/', ensureAuth, cars.getAllCars);
routes.get('/:id', ensureAuth, cars.getSingleCar);
routes.post('/', ensureAuth, saveCar, cars.addCar);
routes.put('/:id', ensureAuth, saveCar, cars.updateCar);
routes.delete('/:id', ensureAuth, cars.deleteCar);

module.exports = routes;