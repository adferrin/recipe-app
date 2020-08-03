const User = require('../models/user');

module.exports = {
    index
};

function index(req, res) {
    User.find({}, function(er, users) {
        res.render('users/index', {
            users,
            user:req.user
        });
    });
}