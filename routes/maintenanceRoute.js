const router = require('express').Router();
const maintenanceController = require('../controllers/maintenance');


router.get('/', maintenanceController.getAllMaintenance);
router.get('/car/:id', maintenanceController.getAllMaintenanceByCarId);
router.get('/:id', maintenanceController.getMaintenanceById);
router.post('/', maintenanceController.createMaintenance);
router.put('/:id', maintenanceController.updateMaintenance);
router.delete('/:id', maintenanceController.deleteMaintenance);

module.exports = router;