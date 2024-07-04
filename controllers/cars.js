const mongoose = require('mongoose');
const CarSchema = require('../models/car');
const ObjectId = require('mongodb').ObjectId;

const getAllCars = async (req, res) => {
    try {
        //const cars = await CarSchema.find(req.user._id);
        //Currently it returns all cars. We need to filter by userId
        await CarSchema.find().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
};

const getSingleCar = async (req, res) => {
    try {
        id = new ObjectId(req.params.id);
        const car = await CarSchema.findById(id).then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
const addCar = async (req, res) => {
    try {
        var today = new Date().toISOString().substring(0, 10);
        await CarSchema.create({
            userId: "Test UserId", //req.user._id
            nickName: req.body.nickName,
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            createdAt: today,
        }).then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(201).json(lists);
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
const updateCar = async (req, res) => {
    try {
        id = new ObjectId(req.params.id);
        const item = await CarSchema.findById(id)
        item.nickName = req.body.nickName;
        item.make = req.body.make;
        item.model = req.body.model;
        item.year = req.body.year;

        await item.save().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(204).json(lists);
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
const deleteCar = async (req, res) => {
    try {
        id = new ObjectId(req.params.id);
        await CarSchema.deleteOne(id).then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getAllCars,
    getSingleCar,
    addCar,
    updateCar,
    deleteCar,
};