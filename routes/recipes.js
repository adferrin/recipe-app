const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes'); 

router.get('/', recipesCtrl.index);
router.get('/new', recipesCtrl.new);
router.get('/:id', isLoggedIn, recipesCtrl.show);
router.post('/', isLoggedIn, recipesCtrl.create);
router.delete('/:id', isLoggedIn, recipesCtrl.delete);
router.put('/:id', isLoggedIn, recipesCtrl.update);
router.get('/:id/edit', isLoggedIn, recipesCtrl.edit);







//Middleware for the isLoggedIn function 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');               //if not authenticated they are taken back to the OAuth service
}

module.exports = router;