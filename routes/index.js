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
  var body = req.body;
  settings = {x: body["origin[x]"],y: body["origin[y]"],z: body["origin[z]"],theta: body["theta"]};
  user = new User({email: req.body.username,settings: settings});
  user.save(function(err){
      res.send("SUP TEST");
  });
});


router.get("/load",function(req,res){
  User.find({email: "Oh boy, here I go coding again!"},function(err,settings){
    console.log("Here we go with the results ", settings);
    res.json(settings);
  });
});

module.exports = router;
