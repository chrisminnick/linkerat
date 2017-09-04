var express = require('express');
var linkRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var router = function(nav){
    var linkController = require('../controllers/linkController')(null,nav);

    linkRouter.use(function(req,res,next){
        if(!req.user) {
           res.redirect('/');
           return;
        }
        next();
    });

    linkRouter.route('/')
        .get(linkController.getIndex);
    linkRouter.route('/:id')
        .get(linkController.getById);
    linkRouter.route('/edit/:id')
        .get(linkController.editLink);
    return linkRouter;
};


module.exports = router;