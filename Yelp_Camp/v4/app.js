var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Campground = require('./models/campgrounds'),
  Comments = require('./models/comment'),
  seedDb = require('./seed.js');


seedDb();
mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({
  extended: true
}));


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
      res.render('campgrounds/index', {
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
  res.render('campgrounds/new');
})

//SHOW
app.get('/campground/:id', function(req, res) {
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCg) {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/show', {
        cg: foundCg
      })
    }
  })
});

// ====================
// Comment Routes
// ====================

app.get('/campground/:id/comments/new', function(req, res) {
  Campground.findById(req.params.id, function(err, cg) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', {
        cg: cg
      })
    }
  })
});

app.post('/campground/:id/comments', function(req, res) {
  Campground.findById(req.params.id, function(err, cg) {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comments.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          cg.comments.push(comment);
          cg.save();
          res.redirect('/campground/' + cg._id);
        }
      })
    }
  })
})

app.listen(3000, () => console.log('Running on port 3000'))