var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt');

//user model
var User = require('../models/users');

//login route

//sign up route -> a push User.create
router.post('/', function(req, res){
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	console.log(req.body)
	req.session.name = req.body.name;
	User.create(req.body, function(err, user) {
		res.send(user);
	});
});


module.exports = router;