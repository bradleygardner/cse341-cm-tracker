module.exports = {
    ensureAuth: (req, res, next) => {
        if (req.isAthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    },

    ensureGuest: (req, res, next) => {
        if (req.isAthenticated()) {
            res.redirect('/dashboard');
        } else {
            return next();
        }
    }
}