var num = ([1, 2, 3, 4, 5]);

function reverse() {
  var array = [];
  for (var i = num.length; i > 0; i--) {
    array.push(num[i - 1])
  }
  console.log(array);
}

var uni = ([7, 7, 7, 7, 7]);

function uniform() {
  var first = uni[0];
  for (var i = 0; i < uni.length; i++) {
    if (uni[i] !== first) {
      return false;
    }
  }
  return true;
}


var movies = [{
    title: "Purge",
    rating: 5,
    seen: true,
  },
  {
    title: "All Eyez on Me",
    rating: 4.6,
    seen: true,
  },
  {
    title: "The color Purple",
    rating: 9,
    seen: false,
  }
];
