const User = require('../models/user');

module.exports = {
    index,
    addRecipe
};

function index(req, res) {
    User.find({}, function(err, users) {
        res.render('recipes/index', {
            users,
            user: req.user
        });
    });
}

function addRecipe (req, res) {};