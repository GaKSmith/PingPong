var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: "Pong" });
});

router.get('/lobby',function(req,res,next){
  res.render("lobby.ejs");
});

module.exports = router;
