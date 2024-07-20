const Warranty = require('../models/warrantySchema');
// Get all warranty records
const getWarrantyRecords = async (req, res) => {
  try {
    const warranties = await Warranty.find();
    res.status(200).json(warranties);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getAllWarrantyByMaintenanceId = async (req, res) => {
  const { id } = req.params;

  try {
    const warranty = await Warranty.find({maintenanceId: id});
    if (!warranty) {
      return res.status(404).json({ message: 'Warranty record not found' });
    }
    res.status(200).json(warranty);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new warranty record
const createWarrantyRecord = async (req, res) => {
  const { maintenanceId, purchasedDate, purchasedFrom, expiredDate, notes } = req.body;
  const newWarranty = new Warranty({
    maintenanceId,
    purchasedDate,
    purchasedFrom,
    expiredDate,
    notes
  });

  try {
    await newWarranty.save();
    res.status(201).json(newWarranty);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(412).json({ message: 'Precondition Failed' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

// Get a warranty record by ID
const getWarrantyRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    const warranty = await Warranty.findById(id);
    if (!warranty) {
      return res.status(404).json({ message: 'Warranty record not found' });
    }
    res.status(200).json(warranty);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a warranty record by ID
const updateWarrantyRecordById = async (req, res) => {
  const { id } = req.params;
  const { maintenanceId, purchasedDate, purchasedFrom, expiredDate, notes } = req.body;

  try {
    const updatedWarranty = await Warranty.findByIdAndUpdate(
      id,
      { maintenanceId, purchasedDate, purchasedFrom, expiredDate, notes },
      { new: true, runValidators: true }
    );
    if (!updatedWarranty) {
      return res.status(404).json({ message: 'Warranty record not found' });
    }
    res.status(204).json(updatedWarranty);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(412).json({ message: 'Precondition Failed' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

// Delete a warranty record by ID
const deleteWarrantyRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWarranty = await Warranty.findByIdAndDelete(id);
    if (!deletedWarranty) {
      return res.status(404).json({ message: 'Warranty record not found' });
    }
    res.status(200).json({ message: 'Warranty record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

function sum(a,b) {
  return a + b
}

module.exports = {
  getWarrantyRecords,
  getAllWarrantyByMaintenanceId,
  createWarrantyRecord,
  getWarrantyRecordById,
  updateWarrantyRecordById,
  deleteWarrantyRecordById,
  sum
};
