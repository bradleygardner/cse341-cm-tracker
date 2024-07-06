const router = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swaggerStatic.json');

router.get('/', ensureGuest, (req, res) => {
    res.send("Welcome to Car Maintenance Tracker, please login at '/auth/google'")
    // res.redirect('/dashboard')
    });

router.get('/dashboard', ensureAuth, (req, res) => {
    res.send("You are logged in. Welcome to your Dashboard")
    });

//router.use("/api-docs", require())
router.use('/car', require('./car'));
router.use('/maintenance', require('./maintenanceRoute'));

module.exports = router;
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router


