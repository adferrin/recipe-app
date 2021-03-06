const express = require('express');
const router = express.Router();
const ingredientsCtrl = require('../controllers/ingredients');

router.get('/ingredients/new', ingredientsCtrl.new);
router.post('/ingredients', ingredientsCtrl.create);
router.get('/:id/edit', ingredientsCtrl.edit);
router.post('/recipes/:id/ingredients', ingredientsCtrl.addToFactor);



module.exports = router;