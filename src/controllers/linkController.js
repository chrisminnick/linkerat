var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var linkController = function(linkService, nav){

    var getIndex = function(req,res){
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

        };

    var getById = function(req,res){
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
    };

    var editLink = function(req,res){
        var id = new objectId(req.params.id);
        var url= 'mongodb://localhost:27017/linkerat';
        mongodb.connect(url, function(err,db){
            var collection = db.collection('links');
            collection.findOne({_id: id},function(err, results) {
                res.render('pages/editLinkView', {
                    title: 'Edit Link',
                    link: results,
                    nav: nav
                })
            })
        })
    };

    return {
        getIndex: getIndex,
        getById: getById,
        editLink: editLink
    }
};
module.exports = linkController;