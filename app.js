var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-hbs');
var createError = require('http-errors');

var app = express();


// view engine setup
// view engine setup
app.engine('hbs', hbs.express4({
	partialsDir: __dirname + '/views/partials',
	layoutsDir: __dirname + '/views/layouts',
  }));
  


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboardcat'));
app.use(session({ 
	secret: 'keyboardcat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))

app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var customersRouter = require('./routes/customersRouter');

app.use(function (req,res,next) {
	res.locals.errors  = req.flash('errors')[0];
	next();
});

app.use(function(req,res,next){
	req.backUrl = backURL=req.header('Referer') || '/';
	next();
});
  

app.use('/', indexRouter);
app.use('/customers', customersRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404,'Page not found'));
});



  
  

module.exports = app;
