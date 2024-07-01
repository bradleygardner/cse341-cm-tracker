const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureGuest, (req, res) => {
    res.send("Login")
    });

router.get('/dashboard', ensureAuth, (req, res) => {
    res.send("Dashboard")
    });

router.use("/api-docs", require())

