let createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    routes = require('./routes/index'),
    settings = require('./conn/db_conn'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    app = express();




app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    url: 'mongodb://localhost/blog',
    port: settings.port
  })
}));



//页面通知
app.use(flash());




 app.set('port', process.env.PORT || 3000);
 //加载express-art-template模块
 app.engine('html', require('express-art-template'));
 //指定模板目录
 app.set('views', __dirname + '/template');
 app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
 });




app.use(favicon(__dirname + '/public/favicon.ico'));

//加载日志中间件
app.use(logger('dev'));
//加载解析json的中间件
app.use(express.json());
//加载解析urlencoded请求体的中间件
app.use(express.urlencoded({ extended: false }));
//加载解析cookie的中间件
app.use(cookieParser());
//设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));
//路由控制器
routes(app);

// 404 
app.use((req, res)=> {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('404.html');
});

//error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('errors.html', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});