var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/:id(*)', function(req, res) {
    var id = req.params.id;
    var obj = {
        orginalURL: id,
        short: "www.website.com/8493"
    };
    var url = "mongodb://localhost:27017/test";
    if (req.url === '/favicon.ico') {
        r.end();
        console.log('favicon requested');
        return;
    }



    mongo.connect(url, function(err, db) {
        if(err) throw err;
        db.createCollection('nodes');
        var nodes = db.collection('nodes');
        nodes.insert({"test":"This is a test"});
        db.close();
    });
    res.send(obj);
});

module.exports = router;
