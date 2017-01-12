
var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var artistSchema = new Schema({
    id : String,
    name : String,
    songs : Number,
    img: String
});

module.exports = artistSchema;