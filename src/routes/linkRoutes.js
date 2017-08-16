var express = require('express');
var linkRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function(nav){



    linkRouter.route('/')
        .get(function(req,res){
            var url = 'mongodb://localhost:27017/linkerat';
            mongodb.connect(url, function(err,db){
                var collection = db.collection('links');
                collection.find({}).toArray(function(err, results) {
                    res.render('pages/linkListView',{
                        title:'All the Links',
                        links: results,
                        nav: nav
                    });
                })
            });

        });
    return linkRouter;
};


module.exports = router;