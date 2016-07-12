require('dotenv').config();

var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mthmeanapp';

mongoose.connect(mongoDBURI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//public files :D
app.use(express.static('public'));

//controller info here!
var usersController = require('./controllers/usersController');
app.use('/users', usersController);

app.get('*', function(req, res){
  res.redirect('/');
});

mongoose.connection.once('open', function(){
    console.log('greetings Planeswalker I await your command');
})


app.listen(port, function(){
    console.log('hush a Planeswalker is among us');
    console.log(process.env.HELLO)
})
