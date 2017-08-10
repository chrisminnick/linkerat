var express = require('express');
var linkRouter = express.Router();

var router = function(nav){
    var links = [
        {
            name: "Google",
            url: "http://www.google.com"
        }
    ];

    linkRouter.route('/')
        .get(function(req,res){
            res.render('pages/linkListView',{
                title:'All the Links',
                links:links,
                nav:nav
            });
        });
    return linkRouter;
};


module.exports = router;