var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function(nav){

    adminRouter.route('/listLinks')
        .get(function(req,res) {
            var url = 'mongodb://localhost:27017/linkerat';
            mongodb.connect(url, function(err,db){
                var collection = db.collection('links');
                collection.find({}).toArray(function(err, results) {
                    res.render('pages/adminLinkListView',{
                        title:'All the Links',
                        links: results,
                        nav: nav
                    });
                })
            });
        });
    adminRouter.route('/addLinks')
        .get(function(req,res) {
            var url = 'mongodb://localhost:27017/linkerat';
            mongodb.connect(url, function(err,db){
                var collection = db.collection('links');
                collection.insertMany(links, function(err, results){
                    res.send(results);
                    db.close();
                });
            });
        });
    return adminRouter;
};

module.exports = router;