var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');


var app = express();


// view engine setup
app.engine('handlebars', exphbs());


app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var indexRouter = require('./routes/index');
var customersRouter = require('./routes/customersRouter');

app.use('/', indexRouter);
app.use('/customers', customersRouter);

module.exports = app;
