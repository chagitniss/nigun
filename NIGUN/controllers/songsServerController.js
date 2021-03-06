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
router.post('/updateSong', updateSong);
router.get('/loadAllSongs', loadAllSongs);
router.post('/deleteSong', deleteSong);
router.get('/loadType/:name', loadType);
router.get('/loadSort/:name', loadSort);
router.post('/loadSongByNames', loadSongByNames);


module.exports = router;

//for admin page
function loadAllSongs(req, res) {
    console.log("in loadallsongs functiom");
    //Getting all songs from database in songs array
    songsList.find({}, function (err, all) {
        if (err)
            res.send(err);
        //console.log(all);
        res.json(all); // return the songs in JSON format
    });
}
function deleteSong(req, res){
    console.log("in delete server")
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {

        var POST = qs.parse(body);
        console.log(POST);
        songsList.remove({'name': POST.name,'artistsName': POST.artistName},function(err, result) {
            if (err) {
                res.send(err);
            }
            console.log("song deleted");
            res.send("האקורדים לשיר "+" '"+POST.name+"' "+"של "+POST.artistName+" נמחקו מהמאגר");
        });
    });
}
function loadSongByNames(req, res) {
    console.log("in loadSongByNames")
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {

        var POST = qs.parse(body);
        console.log(POST);
        songsList.find({'name':POST.name ,'artistsName': POST.artistName}, function (err, songs) {
            if (err)
                res.send(err);
            console.log(songs);
            res.json(songs); // return the songs in JSON format
        });

    });
}
function updateSong(req, res){
    console.log("in updateSong server");
    var body = '';
    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var POST = qs.parse(body);

        var parsLines=JSON.parse(POST.lines);
        console.log(parsLines);
        var lines=[];

        var link=getId(POST.link);//edit youtube ling by help function

        //remoove exist song
        songsList.remove({'name': POST.name,'artistsName': POST.artistName},function(err, result) {
            if (err) {
                res.send(err);
            }
            console.log("song deleted");
        });

        //add new song
            var newSong = new songsList({name: POST.name, artistsName: POST.artistName, type:POST.type, link: link, lines: parsLines});
            newSong.save();
            console.log("song added");
            res.send("האקורדים לשיר "+" '"+POST.name+"' "+"של "+POST.artistName+" התעדכנו בהצלחה!");
    });
}

//*************************************************************************
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

function loadType(req, res) {
    //Getting all songs from artist collection and put in songs array
    var type = req.params.name;
    songsList.find({'type': type}, function (err, songs) {
        if (err)
            res.send(err);
        console.log(songs);
        res.json(songs); // return the songs in JSON format
    });
}

function loadSort(req, res) {
    //Getting all songs from artist collection and put in songs array
    var char = req.params.name;
    songsList.find({}, function (err, songs) {
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

        var link=getId(POST.link);//edit youtube ling by help function

        //validation and save in database
        songsList.find({'name': POST.name,'artistsName': artist}, function (err, song) {
            if (err)
                res.send(err);
            if(song[0]!=null) {
                console.log("song already exist");
                res.send("אתה מנסה להוסיף אקורדים לשיר שכבר קיימים לו אקורדים במאגר.");
            }
            else {
                var newSong = new songsList({name: POST.name, artistsName: artist, type:POST.type, link: link, lines: parsLines});
                newSong.save();

                console.log("song added");
                res.send("האקורדים לשיר "+" '"+POST.name+"' "+"של "+artist+" התווספו בהצלחה!");

                }
        });

    });

}

//manage youtube link
function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}





