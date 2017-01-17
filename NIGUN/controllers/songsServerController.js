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

var songsSchema = require('../DataBase/songModel');
var songsList = mongoose.model('songs',songsSchema);

songsList.find({},function(err,songs){
    console.log(songs);
});

//routing

router.get('/loadSongs/:name', loadSongs);


module.exports = router;

function loadSongs(req, res) {
    //Getting all songs from artist collection and put in songs array
    var name = req.params.name;
    songsList.find({'artistsName': name}, 'name', function (err, songs) {
        if (err)
            res.send(err);
        console.log(songs);
        res.json(songs); // return the songs in JSON format
    });
}