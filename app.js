var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');


var app = express();

var port = 8000;
var nav = [
    {
        link: '/',
        text: 'Home'
    },{
        link: '/links',
        text: 'All Links'
    },{
        link: '/auth/profile',
        text: 'Profile'
    }];

var linkRouter = require('./src/routes/linkRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'linker',
    name: 'linkerat',
    resave:true,
    saveUninitialized:true,
    proxy: true
}));

require('./src/config/passport')(app);

app.set('views','./src/views');

app.set('view engine', 'ejs');

app.use('/links', linkRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function(req,res){
    res.render('pages/index',{
        title: 'welcome',
        nav: nav
    });
});

app.listen(port, function(err){
    console.log('running server on port ' + port);
});