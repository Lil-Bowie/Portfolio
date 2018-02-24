var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

var cg = [{
  name: 'camp1',
  image: ''
}, {
  name: 'camp2',
  image: ''
}, {
  name: 'camp3',
  image: ''
}];

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campground', function(req, res) {

  res.render('campgrounds', {
    cg: cg
  });
});

app.post('/campground', function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCG = {
    name: name,
    image: image
  };
  cg.push(newCG);
  res.redirect('/campground');
});

app.get('/campground/new', function(req, res) {
  res.render('new');
})


app.listen(3000, () => console.log('Running on port 3000'))