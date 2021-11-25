const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
let userObject = require('../models/user');
const bcrypt = require('bcrypt');

passport.use(
    new LocalStrategy({ passReqToCallback: true }, async function (req, username, password, callback) {
        try {
            let user = await userObject.getUser(username);
            if (!user) {
                req.flash('error', `User doesn't exist. Please sign up`);
                return callback(null, false);
            }
            const isValid = await bcrypt.compare(password, user.password);

            if (isValid) {
                return callback(null, user);
            }
            else {
                req.flash('error', 'Wrong password entered');
                return callback(null, false);
            }
        }
        catch (err) {
            console.log(err);
        }
    })
)

passport.serializeUser(function (user, callback) {
    callback(null, user.username);
});

passport.deserializeUser(async function (username, callback) {
    try {
        let user = await userObject.getUser(username);
        if (user) {
            callback(null, user);
        }
    }
    catch (err) {
        return callback(err);
    }
});

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains the current signed in user from the session cookie
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
