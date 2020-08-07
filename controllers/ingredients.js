const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');



module.exports = {
    new: newIngredient,
    create,
    addToFactor,
    edit
};

function edit(req, res) {
    Recipe.findById(req.params.id).populate('factor').exec(function(err, recipe) {
        Ingredient.find(
            {_id: {$nin: recipe.factor}}, function(err, ingredients) {
                res.render('recipes/edit', { title: 'Edit Recipe', recipe, ingredients, user: req.user});
        }); 
    });
}


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