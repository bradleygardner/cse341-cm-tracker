const request = require('supertest')
const mongoose = require("mongoose");
const app = require('../app')
require("dotenv").config();

const { sum } = require('../controllers/warranty');

describe('testing test', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
    });

    test('should add two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });

    let warrantyId;
    it('should create a new warranty record', async () => {
        const res = await request(app)
            .post('/warranty/')
            .send({
                maintenanceId: '123456',
                purchasedDate: '2024-01-01',
                purchasedFrom: 'Vendor A',
                expiredDate: '2025-01-01',
                notes: 'First warranty record'
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body.notes).toEqual('First warranty record');
        warrantyId = res.body._id;
    });

    it('should get all warranty records', async () => {
        const res = await request(app)
            .get('/warranty')
            .send()
        expect(res.statusCode).toEqual(200);
        expect(res.body[res.body.length - 1].notes).toEqual('First warranty record');
    });

    it ('should get all warranty records by maintenance id', async () => {
        const res = await request(app)
            .get('/warranty/maintenance/123456')
            .send()
        expect(res.statusCode).toEqual(200);
        expect(res.body[res.body.length - 1].notes).toEqual('First warranty record');
    });

    it('should update warranty record', async () => {
        const res = await request(app)
            .put(`/warranty/${warrantyId}`)
            .send({
                maintenanceId: '123456',
                purchasedDate: '2024-01-01',
                purchasedFrom: 'Vendor A',
                expiredDate: '2025-01-01',
                notes: 'Updated warranty record'
            })
        expect(res.statusCode).toEqual(204);
    });

    it('should get the updated warranty record', async () => {
        const res = await request(app)
            .get(`/warranty/${warrantyId}`)
            .send()
        expect(res.statusCode).toEqual(200);
        expect(res.body.notes).toEqual('Updated warranty record');
    });

    it ('should delete the warranty record', async () => {
        const res = await request(app)
            .delete(`/warranty/${warrantyId}`)
            .send()
        expect(res.statusCode).toEqual(200);
    })

    afterAll(async () => {
        await mongoose.connection.close();
    });
})