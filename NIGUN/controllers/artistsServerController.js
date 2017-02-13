var express = require('express');
var router = express.Router();
var config=require('../tsconfig.json');
var qs = require('querystring');
var mongoose = require ('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
// we're connected!
});

var db=mongoose.connect(config.connectionString);
console.log("db connected!");

var artistSchema = require('../DataBase/artistModel');
var artistsList = mongoose.model('artists',artistSchema);

artistsList.find({},function(err,artists){
    //console.log(artists);
});


//routing

router.get('/loadArtists', loadArtists);
router.get('/celectArtists', celectArtists);
router.post('/addArtist', addArtist);
//router.get('/loadSongs/:name', loadSongs);


module.exports = router;

function loadArtists(req, res){
    //Getting all documents from artist collection and put in artists array
    artistsList.find({},function(err,artists){
        //console.log(artists);
        res.json(artists);
    });
}
function loadSongs(req, res) {
    //Getting all songs from artist collection and put in songs array
    var name = req.params.name;
    artistsList.findOne({name: name},'songs', function (err, songs) {
        if (err)
            res.send(err);
        console.log(songs);
        res.json(songs); // return the songs in JSON format
    });

}

function celectArtists(req, res){
    //Getting all documents from artist collection and put in artists array
    artistsList.find({},'name',function(err,artists){
        //console.log(artists);
        res.json(artists);
    });
}
//for admin
function addArtist(req,res) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var POST = qs.parse(body);

        artistsList.find({'name': POST.name}, function (err, artist) {
            if (err)
                res.send(err);
            if(artist[0]!=null) {
                console.log("artist already exist");
                res.send("אתה מנסה להוסיף אמן שכבר קיים.");
            }
            else {
            var newArtist = new artistsList({id: POST.id, name: POST.name, songs:POST.songs, img: POST.img});
            newArtist.save();
            console.log("artist added");
                res.send("האומן "+POST.name+" התווסף בהצלחה!");
             }
        });
    });
}