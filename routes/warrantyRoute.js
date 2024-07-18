const router = require('express').Router();
const warrantyController = require('../controllers/warranty');

// Define routes
router.get('/', warrantyController.getWarrantyRecords);
router.get('/maintenance/:id', warrantyController.getAllWarrantyByMaintenanceId);
router.post('/', warrantyController.createWarrantyRecord);
router.get('/:id', warrantyController.getWarrantyRecordById);
router.put('/:id', warrantyController.updateWarrantyRecordById);
router.delete('/:id', warrantyController.deleteWarrantyRecordById);

module.exports = router;