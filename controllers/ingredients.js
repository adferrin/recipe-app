const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');


module.exports = {
    new: newIngredient,
    create,
    addToIngredients,
};

function addToIngredients(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        recipe.ingredient.push(req.body.ingredientId);
        recipe.save(function(err) {
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}

function create(req, res) {
    Ingredient.create(req.body, function(err, ingredient) {
        res.redirect('/ingredients/new');
    });
}

function newIngredient(req, res) {
    Ingredient.find({}, function(err, ingredients) {
        res.render('ingredients/new', {
            ingredients,
            title: 'Add Ingredients'
        });
    });
}