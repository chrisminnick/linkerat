var express = require('express');
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
        link: '/users',
        text: 'Users'
    }];

var linkRouter = require('./src/routes/linkRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(express.static('public'));
app.set('views','./src/views');

app.set('view engine', 'ejs');

app.use('/links', linkRouter);
app.use('/admin', adminRouter);

app.get('/', function(req,res){
    res.render('pages/index',{
        title: 'welcome',
        nav: nav
    });
});

app.listen(port, function(err){
    console.log('running server on port ' + port);
});