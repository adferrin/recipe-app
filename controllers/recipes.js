const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');




module.exports = {
    index,
    show,
    new: newRecipe,
    create,
};

function index(req, res) {
    Recipe.find({}, function(err, recipes) {
        res.render('recipes/index', 
        { title: 'All Recipes', recipes});
    });
}

function show(req, res) {
    Recipe.findById(req.params.id).exec(function(err, recipe) {
        console.log('recipe', recipe);
        Ingredient.find(
            {_id: {$nin: recipe.ingredients}}, function(err, ingredients) {
                res.render('recipes/show', { title: 'Recipe Detail', recipe, ingredients });
        }); 
    });
}

function newRecipe(req, res) {
    res.render('recipes/new', {title: 'Add Recipe' });
}

function create(req, res) {
    // req.body.gluten = !!req.body.gluten;
    // for (let key in req.body) {
    //     if (req.body[key] === '') delete req.body[key];
    // }
    // req.body.dairy = !! req.body.dairy;
    // for (let key in req.body) {
    //     if (req.body[key] === '') delete req.body[key];
    // }
    // req.body.vegan = !! req.body.vegan;
    // for (let key in req.body) {
    //     if (req.body[key] === '') delete req.body[key];
    // }
    
    const recipe = new Recipe(req.body);
    recipe.save(function(err) {
    //handle errors
        if (err) return res.redirect('/recipes/new');
        console.log('recipe', recipe);
    //redirect to new.ejs
        res.redirect(`/recipes/${recipe._id}`);
    });
}