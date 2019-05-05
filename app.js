var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var bodyParser = require('body-parser');
var consolidate = require('consolidate');
var expressRoute = require('express-route');
var logger = require('morgan');

var multer = require('multer');
var multerObj = multer({dest:'./public/upload'});

var indexRouter = require('./routes/user/index');
var usersRouter = require('./routes/user/users');
var registerRouter = require('./routes/user/register');
var listRouter = require('./routes/user/list');
var testRouter = require('./routes/user/test');
var loginRouter = require('./routes/user/login');
var lostthingRouter = require('./routes/user/lostthing');
var loststhaddRouter = require('./routes/user/loststhadd');
var mypostRouter = require('./routes/user/mypost');
var peopsearRouter = require('./routes/user/peopsear');
var peopsearaddRouter = require('./routes/user/peopsearadd');
var mypeopRouter = require('./routes/user/mypeop');
var animalRouter = require('./routes/user/animal');
var animaladdRouter = require('./routes/user/animaladd');
var myanimalRouter = require('./routes/user/myanimal');
var usermsgRouter = require('./routes/user/usermsg');
var msgchangeRouter = require('./routes/user/msgchange');
var zhaolingRouter = require('./routes/user/zhaoling');
var zhaolingaddRouter = require('./routes/user/zhaolingadd');
var myzhaolingRouter = require('./routes/user/myzhaoling');
var repwdRouter = require('./routes/user/repwd');
var upfoundRouter = require('./routes/user/upfound');
var imgaddRouter = require('./routes/user/imgadd');
var imgaddanimalRouter = require('./routes/user/imgaddanimal');
var imgaddsthRouter = require('./routes/user/imgaddsth');
var imgaddzhaolingRouter = require('./routes/user/imgaddzhaoling');

var app = express();

//1.获取请求数据
app.use(bodyParser.urlencoded());
app.use(multerObj.any());
//2.cookie/session
app.use(cookieParser());
(function(){
    var keys=[];
    for(var i=0;i<10000;i++){
        keys[i]='a_'+Math.random();
    }
    app.use(cookieSession({
        name: 'sess_id',
        keys:keys,
        maxAge:50*60*1000 //2min
    }));
})();

app.engine('html',consolidate.ejs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
///////////////////////////
app.use('/admin/',require('./routes/admin/index.js')());

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
