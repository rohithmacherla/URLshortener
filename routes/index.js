/*jshint esversion:6*/
var express = require('express');
var router = express.Router();
var validUrl = require('valid-url');
var shortId = require('shortid');
var mongoose = require('mongoose');


//move this stuff to another file
var url_schema = mongoose.Schema({
    original: String,
    short: String,
}); 

var url_model = mongoose.model('link', url_schema);
var database_url = 'mongodb://localhost/url-example';



router.get('/api/:url_key(*)', function(req, res) {
    var url_key = req.params.url_key;
    if(!validUrl.isUri(url_key)) {
        var nullKey = {original:url_key, short:null};
        res.send(nullKey);
    } else {
        var short = shortId.generate();
        var validKey = {original: url_key, short: short};                
        res.send(validKey);

        mongoose.Promise = global.Promise;
        mongoose.connect(database_url, {useMongoClient: true});
        var database = mongoose.connection;
        database.on('error', console.error.bind(console, 'connection error:'));
        database.once('open', function() {
            var new_document = url_model(validKey);
            new_document.save(function(err, ref) {
                if(err) {
                    console.log("We have an error saving");
                    throw err;
                }
                console.log("Saved new document: " + new_document.original);
            });
        });
    }
});

router.get('/r/:link(*)', function(req, res) {
    var value = req.params.link;

    mongoose.Promise = global.Promise;
    mongoose.connect(database_url, {useMongoClient:true});
    var database = mongoose.connection;

    database.on('error',console.error.bind(console, 'connection error:'));
    database.once('open', function() {
        url_model.findOne({short:value}, function(err, doc) {
            if(err) {
                console.log("Cannot find key with value: " + value);
                throw err;
            }
            console.log("Success! Key:" + doc.original + " Value:" + doc.short);
            res.redirect(doc.original);
        });
    });

});













module.exports = router;
