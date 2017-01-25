
var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var songSchema = new Schema({
    id : String,
    name : String,
    artistsName: String,
    link: String,
    chords: String
});

module.exports = songSchema;