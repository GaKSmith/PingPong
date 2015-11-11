var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Pong" });
});


// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });



module.exports = router;
