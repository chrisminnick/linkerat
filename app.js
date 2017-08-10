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

app.use(express.static('public'));
app.set('views','./src/views');

app.set('view engine', 'ejs');

app.use('/links', linkRouter);

app.get('/', function(req,res){
    res.render('index',{
        title: 'welcome'
    });
});

app.listen(port, function(err){
    console.log('running server on port ' + port);
});