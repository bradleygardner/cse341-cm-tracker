const express = require('express');
const passport = require('passport');
const router = express.Router();

// login with google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// google auth callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/dashboard');
    }
);

// logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
})

module.exports = router