const AdminController = require('../controllers/AdminController');
const Utils = require('../config/Utils');

module.exports = function (app, isLoggedIn) {

    app.get('/', isLoggedIn, function (req, res) {
        const user = Utils.getUserObj(req);
        res.render('admin/index', { user });
    });

    app.get('/admin', function (req, res) {
        res.locals.title = 'Admin Profile';
        res.render('admin/admin');
    });

    app.get('/settings', isLoggedIn, function (req, res) {
        const user = Utils.getUserObj(req);

        res.locals.title = 'Settings';
        res.render('admin/settings', { user });
    });

    app.post('/update-profile', AdminController.updateProfile);

    app.get('/submissions', isLoggedIn, function (req, res) {
        const user = Utils.getUserObj(req);

        res.locals.title = 'Submissions';
        res.render('admin/submissions', { user });
    })

    app.post('/generate-coupons', AdminController.generateCoupons);

};