var express = require('express');
var router = express.Router();
var User = require("../models/user");

router.get('/', function(req, res, next) {
  res.render('index', { title: "Pong" });
});

router.get('/lobby',function(req,res,next){
  res.render("lobby.ejs");
});

router.post('/settings/',function(req,res){
  console.log("request body is ",req.body);
  user = new User({email:req.body.username,settings:req.body});
  user.save(function(err){
      res.send("SUP TEST");
  });
});

module.exports = router;
