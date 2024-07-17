const mongoose = require('mongoose');

const warrantySchema = new mongoose.Schema({
    maintenanceId: String,
    purchasedDate: String,
    purchasedFrom: String,
    expiredDate: String,
    notes: String
});

module.exports = mongoose.model('Warranty', warrantySchema);
