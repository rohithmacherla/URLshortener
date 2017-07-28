var express = require('express');
var router = express.Router();

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
    res.send(obj);
});

module.exports = router;
