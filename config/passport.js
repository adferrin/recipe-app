const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Maker = require('../models/maker');



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,    // this is all in the .env 
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
},
function(accessToken, refreshToken, profile, cb) {       
    // a user has logged in with OAuth
    Maker.findOne({'googleId': profile.id}, function(err, maker) {
        if(err) return cb(err);
        if (user) {
            return cb(null, maker);
        } else {
            // new student, create and add them to our database
            const newMaker = new Maker({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });
            newMaker.save(function(err) {
                if(err) return cb(err);
                return cb(null, newMaker);
            });
        }
    });
  }
));

