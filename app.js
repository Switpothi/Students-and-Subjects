var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

const validate = require('./middleware/validate');
const validatecheck = require('./middleware/validatecheck');


var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var studentsRouter = require('./routes/students');
var subjectsRouter = require('./routes/subjects');

var app = express();
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

//studebts
app.use('/students/addForm', studentsRouter.addForm);
app.get('/students', studentsRouter.list);
app.post('/students/create',
  validate.required('students[code]'),
  validate.lengthAbove('students[code]', 10),
  studentsRouter.create);
app.get('/students/delete/:id', studentsRouter.delete);
app.get('/students/edit/:id', studentsRouter.edit);
app.post('/students/update',
  validate.required('students[code]'),
  validate.lengthAbove('students[code]', 10),
  studentsRouter.update);

  //subjects
  app.use('/subjects/addForm', subjectsRouter.addForm);
app.get('/subjects', subjectsRouter.list);
app.post('/subjects/create',
validatecheck.required('subjects[code]'),
validatecheck.lengthcreditsub('subjects[code]', 1),
validatecheck.lengtidsub('subjects[name]', 8),
  subjectsRouter.create);
app.get('/subjects/delete/:id', subjectsRouter.delete);
app.get('/subjects/edit/:id', subjectsRouter.edit);
app.post('/subjects/update',
validatecheck.required('subjects[code]'),
validatecheck.lengthcreditsub('subjects[code]', 1),
validatecheck.lengtidsub('subjects[name]', 8),
  subjectsRouter.update);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
