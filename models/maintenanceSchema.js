// maintenanceSchema.js

const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    carId: {
        type: String,
        required: true
    },
    mileage: {
        type: String,
        required: true
    },
    part: {
        type: String,
        required: true
    },
    dateInstalled: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);