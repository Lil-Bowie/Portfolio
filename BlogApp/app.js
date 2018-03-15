var express = require('express'),
  methodOverride = require('method-override'),
  expressSanitizer = require('express-sanitizer'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  app = express();

//app config
mongoose.connect('mongodb://localhost/blog_app');
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());

//mongoose model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
});
var Blog = mongoose.model('Blog', blogSchema);

//test
/**Blog.create({
  title: 'Pianos',
  image: 'https://images.unsplash.com/photo-1470019693664-1d202d2c0907?ixlib=rb-0.3.5&s=957abcec1183e3625216ca7773747c7f&auto=format&fit=crop&w=500&q=60',
  body: 'I like to look at Pianos.',
});**/

//RESTful routes
app.get('/', function(req, res) {
  res.redirect('/blogs');
});

app.get('/blogs', function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log('Error occured');
    } else {
      res.render('index', {
        blogs: blogs
      });
    }
  })
})

//New Route
app.get('/blogs/new', function(req, res) {
  res.render('new');
});

//Create Route
app.post('/blogs', function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  var data = req.body.blog
  Blog.create(data, function(err, newBlog) {
    if (err) {
      res.render('new');
    } else {
      res.redirect('/blogs');
    }
  })
});

//Show Route
app.get('/blogs/:id', function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render('show', {
        blog: foundBlog
      });
    }
  })
});

//Edit route
app.get('/blogs/:id/edit', function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', {
        blog: foundBlog
      })
    }
  })
});

//Update route
app.put('/blogs/:id', function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  })
});

// Delete Route
app.delete('/blogs/:id', function(req, res) {
  Blog.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect('/blogs/');
    } else {
      res.redirect('/blogs');
    }
  })
});

var port = 3000;
app.listen(port, function() {
  console.log('Server is live on port ' + port);
});