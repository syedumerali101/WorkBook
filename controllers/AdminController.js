const CouponModel = require('../models/Coupons');
const UserModel = require('../models/Users');
const Str = require('@supercharge/strings')

exports.generateCoupons = (req, res, next) => {
    let data = {
        code: Str.random(5),
        user_id: 1,
        ...req.body
    }

    new CouponModel(data).save(function (error, data) {

        res.contentType('json');

        let message;
        let code = data.code;

        if (data) {
            message = 'Coupon generated successfully';
        }
        if (error) {
            message = 'Please try again';
            code = null
        }

        res.send({ code: code, message: message });
        res.end()
    });
}

exports.updateProfile = (req, res, next) => {
    UserModel.findById(req.body.____id, async function (err, user) {

        res.contentType('json');

        if (err) {
            res.send({ code: false, error: err, message: 'server error' });
            res.end();
        }

        let isUserEmailExist = await UserModel.findOne({ 'email': req.body.email });

        if (isUserEmailExist) {
            res.send({ code: false, message: 'Email already exist' });
            res.end();
        }

        var email = req.body.email.trim();
        var username = req.body.username.trim();
        var firstname = req.body.firstname.trim();
        var lastname = req.body.lastname.trim();

        if (!email || !username || !firstname || !lastname) {
            res.send({ code: false, message: 'One or more fields are empty' });
        }

        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;
        user.username = username;

        user.save(function (err, user) {
            if (err) {
                res.send({ code: false, error: err });
                res.end();
            }

            console.log('huzaifda', user)

            res.send({ code: true, message: 'Profile Updated' });
            res.end();
        });

    });
}
