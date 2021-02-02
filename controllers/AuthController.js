const User = require('../models/Users');


exports.signup = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var referral = req.body.referral;
    User.findOne({ 'email': email }, function (err, user) {
        if (err)
            console.log(err, 'errr')
        // return next(err);
        if (user) {
            console.log(user, 'already');
            res.locals.title = 'Register Dashboard';
            return res.render('signup', { message: 'That email is already taken.' });
        } else {
            var newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.referral = referral;
            newUser.password = newUser.generateHash(password);
            newUser.save(function (err, user) {
                console.log('user', user)
                if (err)
                    throw err;
                // return next(null, newUser);
            });
        }

    });
}

