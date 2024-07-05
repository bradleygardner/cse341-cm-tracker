const request = require('supertest')
const mongoose = require("mongoose");
const app = require('../app')
require("dotenv").config();

describe('Car Endpoints', () => {

    // Connecting to the database
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
    });

    let carId;
    it('should create a new post', async () => {
        const res = await request(app)
            .post('/car')
            .send({
                nickName: 'test is cool',
                make: 'test is cool',
                model: 'test is cool',
                year: 'test is cool',
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body.nickName).toContain('cool')
        carId = res.body._id;
    })
    it('should get all cars', async () => {
        const res = await request(app)
            .get('/car')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body[res.body.length - 1].nickName).toContain('cool')
    })
    it('should update car object', async () => {
        const res = await request(app)
            .put(`/car/${carId}`)
            .send({
                nickName: 'test updated',
                make: 'test is cool',
                model: 'test is cool',
                year: 'test is cool',
            })
        expect(res.statusCode).toEqual(204)
    })
    it('should get the new car object', async () => {
        const res = await request(app)
            .get(`/car/${carId}`)
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body.nickName).toContain('updated')
    })
    it('Should delete the car object', async () => {
        const res = await request(app)
            .delete(`/car/${carId}`)
            .send()
        expect(res.statusCode).toEqual(200);
        expect(res.body.deletedCount).toEqual(1);
    })

    // Closing database connection 
    afterAll(async () => {
        await mongoose.connection.close();
    });
})