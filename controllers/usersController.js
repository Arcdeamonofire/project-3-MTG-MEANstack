var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt');

//user model
var User = require('../models/users');

//login route
router.post('/login', function(req, res){
	User.findOne({userName:req.body.userName}, function(err, foundUser){
		if(bcrypt.compareSync(req.body.password, foundUser.password)){
			req.session.userName = foundUser.userName;
			// console.log(req.session);
			console.log('successful sign in')
			res.send(foundUser);
		} else {
			console.log('failed: bad password')
			res.redirect('/');
		}
	});
});

//sign up route -> a push User.create
router.post('/', function(req, res){
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	console.log(req.body)
	req.session.userName = req.body.userName;
	// console.log(req.session);
	User.create(req.body, function(err, user) {
		res.send(user);
	});
});

//add deck to user's deck
router.post('/deck', function(req,res){
	// console.log(req.session.userName);
	if(req.session.userName !== undefined){
		User.findOne({userName : req.session.userName}, function(err, foundUser){
			// console.log(req.body);
			// console.log(foundUser);
			foundUser.deck.push(req.body)
			foundUser.save(function(err){
				console.log('for the win!');
			});
		})
	}
})

module.exports = router;