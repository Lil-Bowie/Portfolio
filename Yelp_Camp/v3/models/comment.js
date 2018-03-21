var mongoose = require('mongoose')

//Schema Setup
var commentsSchema = new mongoose.Schema({
  text: String,
  author: String
});

var Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;