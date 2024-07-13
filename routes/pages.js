const routes = require('express').Router();
const path = require('path')
const { ensureAuth } = require('../middleware/auth.js');


routes.get('/', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages/index.html'))
});
routes.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages/login.html'))
});
routes.get('/dashboard', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages/index.html'))
});
routes.get('/addcar', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages/addCar.html'))
});
routes.get('/cardetails', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages/carDetails.html'))
});
routes.get('/addmaintenance', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages/addMaintenance.html'))
});

module.exports = routes;