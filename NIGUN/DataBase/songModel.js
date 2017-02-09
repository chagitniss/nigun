
var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var Line = new Schema({
    chords: String,
    words: String
});


var songSchema = new Schema({
    name : String,
    artistsName: String,
    type:String,
    link: String,
    lines: [Line]
});

module.exports = songSchema;