var express = require('express');
var linkRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function(nav){

    linkRouter.use(function(req,res,next){
        if(!req.user) {
           res.redirect('/');
           return;
        }
        next();
    });

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
    linkRouter.route('/:id')
        .get(function(req,res){
            var id = new objectId(req.params.id);
            var url= 'mongodb://localhost:27017/linkerat';
            mongodb.connect(url, function(err,db){
                var collection = db.collection('links');
                collection.findOne({_id: id},function(err, results) {
                    res.render('pages/linkView', {
                        title: 'Link',
                        link: results,
                        nav: nav
                    })
                })
            })
        });
    return linkRouter;
};


module.exports = router;