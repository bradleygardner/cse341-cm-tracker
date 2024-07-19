const router = require('express').Router();
const maintenanceController = require('../controllers/maintenance');
const { ensureAuth } = require('../middleware/auth.js');
const { saveMaintenance } = require('../middleware/validator.js');


router.get('/', ensureAuth, maintenanceController.getAllMaintenance);
router.get('/car/:id', ensureAuth, maintenanceController.getAllMaintenanceByCarId);
router.get('/:id', ensureAuth, maintenanceController.getMaintenanceById);
router.post('/', ensureAuth, saveMaintenance, maintenanceController.createMaintenance);
router.put('/:id', ensureAuth, saveMaintenance, maintenanceController.updateMaintenance);
router.delete('/:id', ensureAuth, maintenanceController.deleteMaintenance);

module.exports = router;