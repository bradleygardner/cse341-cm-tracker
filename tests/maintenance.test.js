const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const maintenanceRoutes = require('../routes/maintenanceRoute');
const Maintenance = require('../models/maintenanceSchema');

const app = express();
app.use(express.json());
app.use('/', maintenanceRoutes);

jest.mock('../models/maintenanceSchema');

describe('Maintenance API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /maintenance', () => {
    it('should get all maintenance records', async () => {
      const maintenanceRecords = [{ _id: '1', carId: '123', mileage: '10000' }];
      Maintenance.find.mockResolvedValue(maintenanceRecords);

      const res = await request(app).get('/');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(maintenanceRecords);
    });

    it('should return 500 if there is an error', async () => {
      Maintenance.find.mockRejectedValue(new Error('Internal Server Error'));

      const res = await request(app).get('/');

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Internal Server Error');
    });
  });

  describe('GET /maintenance/:id', () => {
    it('should get a maintenance record by ID', async () => {
      const maintenanceRecord = { _id: '6688138c7b52fd33ab0738b6', carId: '123', mileage: '10000' };
      Maintenance.findById.mockResolvedValue(maintenanceRecord);

      const res = await request(app).get('/6688138c7b52fd33ab0738b6');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(maintenanceRecord);
    });

    it('should return 412 if ID is invalid', async () => {
      const res = await request(app).get('/invalid-id');

      expect(res.status).toBe(412);
      expect(res.body).toHaveProperty('message', 'Precondition Failed: Invalid ID');
    });

    it('should return 404 if maintenance record not found', async () => {
      Maintenance.findById.mockResolvedValue(null);

      const res = await request(app).get('/6688138c7b52fd33ab0738b7');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Maintenance record not found');
    });

    it('should return 500 if there is an error', async () => {
      Maintenance.findById.mockRejectedValue(new Error('Internal Server Error'));

      const res = await request(app).get('/6688138c7b52fd33ab0738b8');

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Internal Server Error');
    });
  });

  describe('POST /maintenance', () => {
    it('should create a new maintenance record', async () => {
      const newMaintenance = { carId: '123', mileage: '10000' };
      const savedMaintenance = { _id: '1', ...newMaintenance };
      Maintenance.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(savedMaintenance),
      }));

      const res = await request(app).post('/').send(newMaintenance);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(savedMaintenance);
    });

    it('should return 500 if there is an error', async () => {
      Maintenance.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Internal Server Error')),
      }));

      const res = await request(app).post('/').send({ carId: '123', mileage: '10000' });

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Internal Server Error');
    });
  });

  describe('PUT /maintenance/:id', () => {
    it('should update a maintenance record by ID', async () => {
      const updatedMaintenance = { _id: '6688138c7b52fd33ab0738b9', carId: '123', mileage: '15000' };
      Maintenance.findByIdAndUpdate.mockResolvedValue(updatedMaintenance);

      const res = await request(app).put('/6688138c7b52fd33ab0738b9').send(updatedMaintenance);

      expect(res.status).toBe(204);
    });

    it('should return 412 if ID is invalid', async () => {
      const res = await request(app).put('/invalid-id').send({ carId: '123', mileage: '15000' });

      expect(res.status).toBe(412);
      expect(res.body).toHaveProperty('message', 'Precondition Failed: Invalid ID');
    });

    it('should return 404 if maintenance record not found', async () => {
      Maintenance.findByIdAndUpdate.mockResolvedValue(null);

      const res = await request(app).put('/6688138c7b52fd33ab0738b5').send({ carId: '123', mileage: '15000' });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Maintenance record not found');
    });

    it('should return 500 if there is an error', async () => {
      Maintenance.findByIdAndUpdate.mockRejectedValue(new Error('Internal Server Error'));

      const res = await request(app).put('/6688138c7b52fd33ab0738b5').send({ carId: '123', mileage: '15000' });

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Internal Server Error');
    });
  });

  describe('DELETE /maintenance/:id', () => {
    it('should delete a maintenance record by ID', async () => {
      Maintenance.findByIdAndDelete.mockResolvedValue({ _id: '6688138c7b52fd33ab0738b4', carId: '123', mileage: '10000' });

      const res = await request(app).delete('/6688138c7b52fd33ab0738b4');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Maintenance record deleted');
    });

    it('should return 412 if ID is invalid', async () => {
      const res = await request(app).delete('/invalid-id');

      expect(res.status).toBe(412);
      expect(res.body).toHaveProperty('message', 'Precondition Failed: Invalid ID');
    });

    it('should return 404 if maintenance record not found', async () => {
      Maintenance.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app).delete('/6688138c7b52fd33ab0738b3');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Maintenance record not found');
    });

    it('should return 500 if there is an error', async () => {
      Maintenance.findByIdAndDelete.mockRejectedValue(new Error('Internal Server Error'));

      const res = await request(app).delete('/6688138c7b52fd33ab0738b2');

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Internal Server Error');
    });
  });
});
