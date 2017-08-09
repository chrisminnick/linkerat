var express = require('express');
var linkRouter = express.Router();

var links = [
    {
        name: "Google",
        url: "http://www.google.com"
    }
];

linkRouter.route('/')
    .get(function(req,res){
        res.render('linkListView',{
            title:'Links'
        }, {
            links: links
        }
    )
});

module.exports = linkRouter;