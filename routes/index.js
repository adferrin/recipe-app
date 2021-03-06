const express = require('express');
const router = express.Router();
const passport = require('passport');



router.get('/', function(req, res) {
  res.render('index', {
    user: req.user, 
    title: 'User Information,'
  }); 
});

router.get('/auth/google', passport.authenticate(         
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route //also this handles the login
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/users',
    failureRedirect : '/'
  }
));

//logout

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;