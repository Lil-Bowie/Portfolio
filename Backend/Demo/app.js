var express = require('express')
var app = express()

app.get('/', function(req, res) {
  res.send('Hi there, welcome to the assignment!')
})

app.get('/speak/:pet', function(req, res) {
  var pet = req.params.pet;
  var sounds = {
    pig: 'Oink!',
    cow: 'Moo!',
    dog: 'Woof Woof!',
    cat: 'I love humans.',
    goldfish: '...'
  }
  var sound = sounds[pet]
  res.send('The ' + pet + ' says ' + sound);
})

app.get('/repeat/:say/:num', function(req, res) {
  var say = req.params.say;
  var num = Number(req.params.num);
  var arr = '';
  for (var i = 0; i < num; i++) {
    arr += say + " ";
  }
  res.send(arr);
})

app.get('*', function(req, res) {
  res.send('Sorry page not found...What are you doing with your life?')
})

app.listen(3000, () => console.log('Example app listening on port 3000'))