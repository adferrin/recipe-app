const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const User = require('../models/user');
const reviews = require('./reviews');



module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    update,
    edit,
    delete: removeRecipe,
};


function removeRecipe(req, res) {
    Recipe.findByIdAndDelete(req.params.id, function(err, recipe) {
        res.redirect('/recipes')
    });
}


function edit(req, res) {
    Recipe.findById(req.params.id).populate('factor').exec(function(err, recipe) {
        Ingredient.find(
            {_id: {$nin: recipe.factor}}, function(err, ingredients) {
                res.render('recipes/edit', { title: 'Edit Recipe', recipe, ingredients, user: req.user});
        }); 
    });
}

function update(req, res) {
    Recipe.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { new: true }, 
        function(err, recipe) {
            res.redirect('/recipes')
        });
}

function index(req, res) {
    Recipe.find({}, function(err, recipes) {
        console.log('recipes', recipes);
        res.render('recipes/index', 
        { title: 'All Recipes', recipes, user: req.user});
    });
}

function show(req, res) {
    Recipe.findById(req.params.id).populate('factor').exec(function(err, recipe) {
        console.log('recipe', recipe);
        Ingredient.find(
            {_id: {$nin: recipe.factor}}, function(err, ingredients) {
                res.render('recipes/show', { title: 'Recipe Details', recipe, ingredients, user: req.user});
        }); 
    });
}

function newRecipe(req, res) {
    res.render('recipes/new', {title: 'Add Recipe', user: req.user});
}

function create(req, res) {
    req.body.gluten = !!req.body.gluten;
    req.body.dairy = !!req.body.dairy;
    req.body.vegan = !!req.body.vegan;
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    req.body.author = req.user._id;
    const recipe = new Recipe(req.body);
    recipe.save(function(err) {
    //handle errors
        if (err) { console.log('err', err)
        return res.redirect('/recipes/new');
    }
        console.log('recipe', recipe);
    //redirect to new.ejs
        res.redirect(`/recipes/${recipe._id}`);
    });
}