
var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var Line = new Schema({
    chords: String,
    words: String
});


var songSchema = new Schema({
    id : String,
    name : String,
    artistsName: String,
    link: String,
    lines: [Line]
});

module.exports = songSchema;