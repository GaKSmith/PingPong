var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favorite: String,
  created_at: Date,
  updated_at: Date
});

userSchema.methods.sayHello = function() {
  console.log("Hi, I'm " + this.name + ' and ' + this.favorite + ' is my favorite');
};

var User = mongoose.model('User', userSchema);

module.exports = User;

// Make this available to our other files
module.exports = User
