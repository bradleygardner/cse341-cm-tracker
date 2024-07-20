const request = require('supertest')
const mongoose = require("mongoose");
const app = require('../app')
require("dotenv").config();

describe('Maintenance Endpoints', () => {
    
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
    });

    let maintenanceId;
    it('should create a new maintenance record', async () => {
        const res = await request(app)
            .post('/maintenance')
            .send({
                carId: '111',
                mileage: '10000',
                part: 'Oil change',
                dateInstalled: '2022-01-01',
                cost: '60',
                description: 'maintenance description',
                notes: 'maintenance notes'
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body.notes).toEqual('maintenance notes');
        maintenanceId = res.body._id;
    })

    it('should get all maintenance records', async () => {
        const res = await request(app)
            .get('/maintenance')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body[res.body.length - 1].notes).toEqual('maintenance notes');
    })

    it('should get all maintenance records by car id', async () => {
        const res = await request(app)
            .get('/maintenance/car/111')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body[res.body.length - 1].notes).toEqual('maintenance notes');
    });

    it('should update maintenance object', async () => {
        const res = await request(app)
            .put(`/maintenance/${maintenanceId}`)
            .send({
                carId: '123456',
                mileage: '10000',
                part: 'Oil change',
                dateInstalled: '2022-01-01',
                cost: '60',
                description: 'maintenance description',
                notes: 'updated maintenance notes'
            })
        expect(res.statusCode).toEqual(204)
    })

    it('should get the new maintenance object', async () => {
        const res = await request(app)
            .get(`/maintenance/${maintenanceId}`)
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body.notes).toEqual('updated maintenance notes');
    })

    it('Should delete the maintenance object', async () => {
        const res = await request(app)
            .delete(`/maintenance/${maintenanceId}`)
            .send()
        expect(res.statusCode).toEqual(200);
    })

    afterAll(async () => {
        await mongoose.connection.close();
    });

})