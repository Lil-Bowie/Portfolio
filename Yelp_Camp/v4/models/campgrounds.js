var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments"
  }]
});
var Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;