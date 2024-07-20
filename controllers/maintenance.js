const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const Maintenance = require('../models/maintenanceSchema');

// Get all maintenance records
async function getAllMaintenance(req, res) {
    try {
        const maintenanceRecords = await Maintenance.find();
        res.status(200).json(maintenanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

// Get a maintenance record by ID
async function getMaintenanceById(req, res) {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(412).json({ message: 'Precondition Failed: Invalid ID' });
        }
        const maintenanceRecord = await Maintenance.findById(id);
        if (!maintenanceRecord) {
            return res.status(404).json({ message: 'Maintenance record not found' });
        }
        res.status(200).json(maintenanceRecord);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

// Get all maintenance record by car ID
async function getAllMaintenanceByCarId(req, res) {
    const { id } = req.params;
    
    try {
        const maintenance = await Maintenance.find({carId: id});
        if (!maintenance) {
            return res.status(404).json({ message: 'Precondition Failed: Invalid ID' });
        }
        res.status(200).json(maintenance);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

// Create a new maintenance record
async function createMaintenance(req, res) {
    try {
        const newMaintenance = new Maintenance(req.body);
        const savedMaintenance = await newMaintenance.save();
        res.status(201).json(savedMaintenance);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

// Update a maintenance record by ID
async function updateMaintenance(req, res) {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(412).json({ message: 'Precondition Failed: Invalid ID' });
        }
        const updatedMaintenance = await Maintenance.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMaintenance) {
            return res.status(404).json({ message: 'Maintenance record not found' });
        }
        res.status(204).json(updatedMaintenance);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

// Delete a maintenance record by ID
async function deleteMaintenance(req, res) {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(412).json({ message: 'Precondition Failed: Invalid ID' });
        }
        const deletedMaintenance = await Maintenance.findByIdAndDelete(id);
        if (!deletedMaintenance) {
            return res.status(404).json({ message: 'Maintenance record not found' });
        }
        res.status(200).json({ message: 'Maintenance record deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

module.exports = {
    getAllMaintenance,
    getMaintenanceById,
    getAllMaintenanceByCarId,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance
};
