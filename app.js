var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'simhopp',
    password: 'simhopp95S',
    database: 'simhopp'
},
    console.log('Connected to database')
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);

module.exports = app;
