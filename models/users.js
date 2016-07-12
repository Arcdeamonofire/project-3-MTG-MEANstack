var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	userName: String,
	password: String || Number
});

module.exports= mongoose.model('User', userSchema);