/*jshint esversion:6*/
var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var urlcheck = require('valid-url');


router.get('/:id(*)', function(req, res) {
    if (req.url === '/favicon.ico') {
        res.end();
        return;
    }
    var url = "mongodb://localhost:27017/test";
    var id = req.params.id;
    var obj = {
            orginalURL: id,
            short: "www.website.com/8493"
    };

    //if(id.indexOf('.com') > -1 || id.indexOf('.net') > -1 
     //   || id.indexOf('.org') > -1 || id.indexOf('.gov') > -1) {
        //if id is just numbers then look into the database for the original URL and redirect
        //if it's not my website, then add it to the databse and print JSON
    
        mongo.connect(url, function(err, db) {
            if(err) throw err;
            
            if(!isNaN(id)) {
                //connect to database to find original and redirect
                var og = db.collection('nodes').find({"short": id});
                if(og !== null) {
                    res.redirect(og.orginalURL);
                } else {
                    res.send("Not Valid");
                }
            } else {
                //put this into the database and return json
                var collection = db.collection('nodes');
                var hash = Math.floor(Math.random()*100000);
                collection.insert({"orginalURL": id, "short": hash});
                res.send({"orginalURL": id, "short": hash});
            }
            db.close();
        });
    //} else {
    //    res.send({orginalURL:id, "short": null});
    //}
});

module.exports = router;
