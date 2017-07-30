var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


/*
https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
I didn't write this method, but this is less bug prone than my initial plan so I'll 
be using this :). 
*/
function validURL(str) {
  var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
    '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
    '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
    '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
    '(\#[-a-z\d_]*)?$','i'); // fragment locater
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}



router.get('/:id(*)', function(req, res) {
    if (req.url === '/favicon.ico') {
        r.end();
        return;
    }
    var id = req.params.id;
    if(validURL(id)) {
        var obj = {
            orginalURL: id,
            short: "www.website.com/8493"
        };
        var url = "mongodb://localhost:27017/test";
        mongo.connect(url, function(err, db) {
            if(err) throw err;
            db.createCollection('nodes');
            var nodes = db.collection('nodes');
            nodes.insert({"test":"This is a test"});
            db.close();
        });
        res.send(obj);
    }
    
});

module.exports = router;
