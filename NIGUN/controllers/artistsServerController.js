var express = require('express');
var router = express.Router();
var config=require('../tsconfig.json');

var mongoose = require ('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
// we're connected! Create your schemas and models here
});

var db=mongoose.connect(config.connectionString);
console.log("db connected!");

var artistSchema = require('../DataBase/artistModel');
var artistsList = mongoose.model('artists',artistSchema);

artistsList.find({},function(err,artists){
    console.log(artists);
});


//routing

router.get('/loadArtists', loadArtists);

module.exports = router;

function loadArtists(req, res){
    //Getting all documents from artist collection and put in artists array
    artistsList.find({},function(err,artists){
        console.log(artists);
        res.json(artists);
    });
}


