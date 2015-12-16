var express = require('express');
var router = express.Router();
var User = require('../models/user');

var dmx = new User;
dmx.name = "dmx";
dmx.email ="suppppppp";
dmx.favorite = "Giving it to you";
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("dmx says ",dmx.sayHello());
  res.send('respond with a resource');
});

module.exports = router;
