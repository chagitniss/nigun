var express = require('express');
var router = express.Router();
var config=require('../tsconfig.json');
var qs = require('querystring');

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

/*songsList.find({},function(err,songs){
    console.log(songs);
});*/

//routing

router.get('/loadSongs/:name', loadSongs);
router.get('/loadChords/:name', loadChords);
router.post('/addsong', addsong);


module.exports = router;

function loadSongs(req, res) {
    //Getting all songs from artist collection and put in songs array
    var name = req.params.name;
    songsList.find({'artistsName': name}, function (err, songs) {
        if (err)
            res.send(err);
        console.log(songs);
        res.json(songs); // return the songs in JSON format
    });
}
function loadChords(req, res) {
    //Getting song data from songs collection and put in songs array
    var name = req.params.name;
    var artistName = req.params.artistName;
    songsList.find({'name': name}, function (err, song) {
        if (err)
            res.send(err);
        console.log(song);
        res.json(song); // return the songs in JSON format
    });
}


function addsong(req,res) {
    //add song to database
    console.log("get post request in server side");
    var body = '';
    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var POST = qs.parse(body);
        var artist=POST.artistName;
        var parsLines=JSON.parse(POST.lines);
        console.log(parsLines);
        var lines=[];

        //validation and save in database
        songsList.find({'name': POST.name,'artistsName': artist}, function (err, song) {
            if (err)
                res.send(err);
            if(song[0]!=null) {
                console.log("song already exist");
                res.send("אתה מנסה להוסיף אקורדים לשיר שכבר קיימים לו אקורדים במאגר.");
            }
            else {
                var newSong = new songsList({name: POST.name, artistsName: artist, link: POST.link, lines: parsLines});
                //newSong.save();
                console.log("song added");
                res.send("האקורדים לשיר "+" '"+POST.name+"' "+"של "+artist+" התווספו בהצלחה!");

                }
        });

    });

}

