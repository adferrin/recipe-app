const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');
// const ingredient = require('../models/ingredient');


module.exports = {
    new: newIngredient,
    create,
    addToFactor,
};

function addToFactor(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        recipe.factor.push(req.body.ingredientId);
        recipe.save(function(err) {
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}

function create(req, res) {
    Ingredient.create(req.body, function(err, ingredients) {
        res.redirect('/ingredients/new');
    });
}

function newIngredient(req, res) {
    Ingredient.find({}, function(err, ingredients) {
        res.render('ingredients/new', {
            ingredients,
            title: 'Add Ingredient',
            user: req.user,
        });
    });
}