const router = require('express').Router();
const warrantyController = require('../controllers/warranty');
const { ensureAuth } = require('../middleware/auth.js');
const { saveWarranty } = require('../middleware/validator.js');
// Define routes
router.get('/', ensureAuth, warrantyController.getWarrantyRecords);
router.get('/maintenance/:id', ensureAuth, warrantyController.getAllWarrantyByMaintenanceId);
router.post('/', ensureAuth, saveWarranty, warrantyController.createWarrantyRecord);
router.get('/:id', ensureAuth, warrantyController.getWarrantyRecordById);
router.put('/:id', ensureAuth, saveWarranty, warrantyController.updateWarrantyRecordById);
router.delete('/:id', ensureAuth, warrantyController.deleteWarrantyRecordById);

module.exports = router;