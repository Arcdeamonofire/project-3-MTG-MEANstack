require('dotenv').config();

var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mthmeanapp';

mongoose.connect(mongoDBURI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//will need to be uncommented once we have a public folder we are referencing
// app.use(express.static('public'));

//include controller info here!


mongoose.connection.once('open', function(){
    console.log('greetings Planeswalker I await your command');
});

app.listen(port, function(){
    console.log('hush a Planeswalker is among us');
    console.log(process.env.HELLO)
});
