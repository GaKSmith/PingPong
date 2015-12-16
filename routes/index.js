var express = require('express');
var router = express.Router();
var User = require("../models/user");

router.get('/', function(req, res, next) {
  res.render('index', { title: "Pong" });
});

router.get('/lobby',function(req,res,next){
  res.render("lobby.ejs");
});

router.post('/settings',function(req,res,next){
  user = new User({name:"SMONGER part4",email:"I really love Game of Thrones now"});
  user.save(function(err){
      res.send("SUP TEST");

  });
});

module.exports = router;
