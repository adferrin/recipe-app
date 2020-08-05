const User = require('../models/user');
const Recipe = require('../models/recipe')



module.exports = {
    index,
    addRecipe
};

function index(req, res) {
    User.find({}, function(err, users) {
        Recipe.find({}, function(err, recipes) {
            res.render('recipes/index', {
                users,
                user: req.user,
                title: 'All Recipes',
                recipes,
            });
        });
    });
}

function addRecipe (req, res) {};