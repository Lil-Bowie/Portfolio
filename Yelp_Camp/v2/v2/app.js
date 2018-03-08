var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({
  extended: true
}));

//Schema Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

/**Campground.create({
  name: 'camp1',
  image: ''
}, function(err, campdata) {
  if (err) {
    console.log('wrong');
  } else {
    console.log('New data added');
    console.log(campdata);
  }
})**/



//Routing for app
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('landing');
});

//INDEX
app.get('/campground', function(req, res) {

  //Get All the Campground from DB
  Campground.find({}, function(err, campdata) {
    if (err) {
      console.log('Error occured');
    } else {
      res.render('index', {
        cg: campdata
      });
    }
  });
});

//Create
app.post('/campground', function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCG = {
    name: name,
    image: image,
    description: desc
  };
  // Create a new campground and save to DB
  Campground.create(newCG, function(err, newdata) {
    if (err) {
      console.log('something is not right');
    } else {
      // Redirect to the campgrouds list
      res.redirect('/campground');;
    }
  });
});

//NEW
app.get('/campground/new', function(req, res) {
  res.render('new');
})

//SHOW
app.get('/campground/:id', function(req, res) {
  Campground.findById(req.params.id, function(err, foundCg) {
    if (err) {
      console.log(err);
    } else {
      res.render('show', {
        cg: foundCg
      })
    }
  })
});

app.listen(3000, () => console.log('Running on port 3000'))