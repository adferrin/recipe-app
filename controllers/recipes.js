const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const User = require('../models/user')



module.exports = {
    index,
    show,
    new: newRecipe,
    create,
};


function index(req, res) {
    Recipe.find({}, function(err, recipes) {
        res.render('recipes/index', 
        { title: 'All Recipes', recipes, user: req.user});
    });
}

function show(req, res) {
    Recipe.findById(req.params.id).exec(function(err, recipe) {
        console.log('recipe', recipe);
        Ingredient.find(
            {_id: {$nin: recipe.ingredients}}, function(err, ingredients) {
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