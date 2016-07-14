var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	userName: { type: String, unique: true },
	gender: String,
	password: String || Number
});

module.exports= mongoose.model('User', userSchema);