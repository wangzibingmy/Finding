var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var listRouter = require('./routes/list');
var testRouter = require('./routes/test');
var loginRouter = require('./routes/login');
var lostthingRouter = require('./routes/lostthing');
var loststhaddRouter = require('./routes/loststhadd');
var mypostRouter = require('./routes/mypost');
var peopsearRouter = require('./routes/peopsear');
var peopsearaddRouter = require('./routes/peopsearadd');
var mypeopRouter = require('./routes/mypeop');
var animalRouter = require('./routes/animal');
var animaladdRouter = require('./routes/animaladd');
var myanimalRouter = require('./routes/myanimal');
var usermsgRouter = require('./routes/usermsg');
var msgchangeRouter = require('./routes/msgchange');
var zhaolingRouter = require('./routes/zhaoling');
var zhaolingaddRouter = require('./routes/zhaolingadd');
var myzhaolingRouter = require('./routes/myzhaoling');
var repwdRouter = require('./routes/repwd');
var upfoundRouter = require('./routes/upfound');
var imgaddRouter = require('./routes/imgadd');
var imgaddanimalRouter = require('./routes/imgaddanimal');
var imgaddsthRouter = require('./routes/imgaddsth');
var imgaddzhaolingRouter = require('./routes/imgaddzhaoling');

var app = express();
// app.all('*', function(req, res, next) {
//   res.header('Acess-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
//   res.header('Access-Control-Allow-Methods”,“PUT,POST,GET,DELETE,OPTIONS');
//   res.header('X-Powered-By','3.2.1')
//   if(req.method=='OPTIONS') 
//   res.send(200);
//   else  next();
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register',registerRouter);
app.use('/list',listRouter);
app.use('/test',testRouter);
app.use('/login',loginRouter);
app.use('/lostthing',lostthingRouter);
app.use('/loststhadd',loststhaddRouter);
app.use('/mypost',mypostRouter);
app.use('/peopsear',peopsearRouter);
app.use('/peopsearadd',peopsearaddRouter);
app.use('/mypeop',mypeopRouter);
app.use('/animal',animalRouter);
app.use('/animaladd',animaladdRouter);
app.use('/myanimal',myanimalRouter);
app.use('/usermsg',usermsgRouter);
app.use('/msgchange',msgchangeRouter);
app.use('/zhaoling',zhaolingRouter);
app.use('/myzhaoling',myzhaolingRouter);
app.use('/zhaolingadd',zhaolingaddRouter);
app.use('/repwd',repwdRouter);
app.use('/upfound',upfoundRouter);
app.use('/imgadd',imgaddRouter);
app.use('/imgaddanimal',imgaddanimalRouter);
app.use('/imgaddsth',imgaddsthRouter);
app.use('/imgaddzhaoling',imgaddzhaolingRouter);

app.use(bodyParser.json({limit:'500kb'}));
app.use(bodyParser.urlencoded({limit:'500kb',extended:true}));

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
