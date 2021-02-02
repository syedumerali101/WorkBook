var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/Users');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {
            User.findOne({ 'email': req.body.email }, function (err, user) {
                console.log('agya')
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    var newUser = new User();

                    newUser.username = req.body.username;
                    newUser.password = newUser.generateHash(req.body.password);
                    newUser.email = req.body.email;
                    newUser.referral = req.body.referral;

                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });

        }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            User.findOne({ 'username': req.body.username }, function (err, user) {
                console.log('huzaifa', user)
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Invalid email.'));

                if (!user.validPassword(req.body.password, user.password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                return done(null, user);
            });

        }));


};