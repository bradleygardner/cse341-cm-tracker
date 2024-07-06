require("dotenv").config();

module.exports = {

    ensureAuth: (req, res, next) => {
        if (process.env.TEST == "true") {
            return next();
        }
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/auth/google');
        }
    },

    ensureGuest: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
        } else {
            return next();
        }
    }
}