const router = require('express').Router();
const usersCtrl = require('../controllers/users');

// Get users
router.get('/users', usersCtrl.index);


//Post facts already have access to logged in user on server 
// therefore do not use /user/:id/recipes
router.post('/recipes', isLoggedIn, usersCtrl.addRecipe);  

//Delete recipes /recipes/:id
router.delete('/recipes/:id', isLoggedIn, usersCtrl.delRecipe);


//Middleware for the isLoggedIn function 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');               //if not authenticated they are taken back to the OAuth service
}

module.exports = router;
