var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt');

//user model
var User = require('../models/users');

//login route
router.post('/login', function(req, res){
	User.findOne({userName:req.body.userName}, function(err, foundUser){
		if(bcrypt.compareSync(req.body.password, foundUser.password)){
			req.session.name = foundUser.name;
			console.log('successful sign in')
			res.send(foundUser);
		} else {
			alert('You need to sign up!');
			res.redirect('/');
		}
	});
});

//sign up route -> a push User.create
router.post('/', function(req, res){
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	console.log(req.body)
	req.session.userName = req.body.userName;
	User.create(req.body, function(err, user) {
		res.send(user);
	});
});


module.exports = router;