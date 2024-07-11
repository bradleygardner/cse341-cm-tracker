const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swaggerStatic.json');

router.use('/', require('./pages'));
router.use('/car', require('./car'));
router.use('/maintenance', require('./maintenanceRoute'));

module.exports = router;
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router


