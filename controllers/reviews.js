const Recipe = require('../models/recipe');

module.exports = {
    create,
};

// this function needs to find the recipe id first b/c reviews are embedded in the recipe schema
// in recipe.reviews.push the reviews is the array and I am pushing the information from the body (req.body) into the array
// the redirects purpose is to refresh the page
function create(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        recipe.reviews.push(req.body);
        recipe.save(function(err) {             //calling the save function on the recipe schema which is the parent of the review doc
            res.redirect(`/recipes/${recipe._id}`);     //could use req.params.id for the redirect but this is best practices
        });
    });
}




