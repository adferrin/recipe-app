const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || '3000';


//method over ride allows the ability to delete 
// We'll need to load the env vars
require('dotenv').config();



// create the Express app
const app = express();



// connect to the MongoDB with mongoose
require('./config/database');
require('./config/passport');




// require our routes
const indexRouter = require('./routes/index');
const recipesRouter = require('./routes/recipes');
const reviewsRouter = require('./routes/reviews');
const ingredientsRouter = require('./routes/ingredients');
const userRouter = require('./routes/users');


// view engine setup
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// TODO Add session middleware here
app.use(session({
  secret: 'MakingFood!',
  resave: false,
  saveUninitialized: true,
}));


// TODO Add passport middleware here
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/', reviewsRouter);
app.use('/', ingredientsRouter);
app.use('/', userRouter);
app.use('/recipes', recipesRouter);



app.listen(port, () => {
  console.log(`Express is listening on port:${port}`);
});
