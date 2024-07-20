const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const warrantyRoutes = require('../routes/warrantyRoute');
const Warranty = require('../models/warrantySchema');

const app = express();
app.use(express.json());
app.use('/warranty', warrantyRoutes);

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/warrantyTestDB`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Warranty API', () => {
  it('should get all warranty records', async () => {
    const res = await request(app).get('/warranty/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should create a new warranty record', async () => {
    const newWarranty = {
      maintenanceId: '123456',
      purchasedDate: '2024-01-01',
      purchasedFrom: 'Vendor A',
      expiredDate: '2025-01-01',
      notes: 'First warranty record'
    };
    const res = await request(app).post('/warranty/').send(newWarranty);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.maintenanceId).toEqual(newWarranty.maintenanceId);
  });

  it('should get a warranty record by ID', async () => {
    const newWarranty = new Warranty({
      maintenanceId: '654321',
      purchasedDate: '2023-06-01',
      purchasedFrom: 'Vendor B',
      expiredDate: '2024-06-01',
      notes: 'Another warranty record'
    });
    await newWarranty.save();

    const res = await request(app).get(`/warranty/${newWarranty._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body._id).toEqual(newWarranty._id.toString());
  });

  it('should update a warranty record by ID', async () => {
    const newWarranty = new Warranty({
      maintenanceId: '789012',
      purchasedDate: '2022-05-01',
      purchasedFrom: 'Vendor C',
      expiredDate: '2023-05-01',
      notes: 'Old warranty record'
    });
    await newWarranty.save();

    const updatedData = {
      maintenanceId: '789012',
      purchasedDate: '2022-05-01',
      purchasedFrom: 'Vendor D',
      expiredDate: '2024-05-01',
      notes: 'Updated warranty record'
    };
    const res = await request(app).put(`/warranty/${newWarranty._id}`).send(updatedData);
    expect(res.statusCode).toEqual(204);

    const updatedWarranty = await Warranty.findById(newWarranty._id);
    expect(updatedWarranty.purchasedFrom).toEqual(updatedData.purchasedFrom);

    // Explicitly casting expiredDate to a Date object before comparison
    const expiredDate = new Date(updatedWarranty.expiredDate);
    expect(expiredDate.toISOString().split('T')[0]).toEqual(updatedData.expiredDate);
  });

  it('should delete a warranty record by ID', async () => {
    const newWarranty = new Warranty({
      maintenanceId: '345678',
      purchasedDate: '2021-04-01',
      purchasedFrom: 'Vendor E',
      expiredDate: '2022-04-01',
      notes: 'To be deleted'
    });
    await newWarranty.save();

    const res = await request(app).delete(`/warranty/${newWarranty._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Warranty record deleted successfully');

    const deletedWarranty = await Warranty.findById(newWarranty._id);
    expect(deletedWarranty).toBeNull();
  });
});