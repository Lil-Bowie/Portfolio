var numSquares = 6;
var colors = colorGenerator(numSquares);
var square = document.querySelectorAll('.square');
var pickedColor = pickColor();
var display = document.getElementById('display');
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var modeBtns = document.querySelectorAll('.mode');

for (var i = 0; i < modeBtns.length; i++) {
  modeBtns[i].addEventListener('click', function() {
    this.classList.add('selected')

    //Checked which mode
    if (this.textContent === 'Easy') {
      numSquares = 3;
      modeBtns[1].classList.remove('selected');
    } else {
      numSquares = 6;
      modeBtns[0].classList.remove('selected');
    }
  })
  reset();
};

function reset() {
  //Generate new colors
  colors = colorGenerator(numSquares);
  //Set the new winning color
  pickedColor = pickColor();
  //Change color display
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
  display.textContent = pickedColor;
  //Change the color of the squares
  for (var i = 0; i < square.length; i++) {
    square[i].style.backgroundColor = colors[i];
  }
  //backgroundColor reset
  h1.style.backgroundColor = "steelblue";
  resetButton.textContent = "New Colors";
}



/**var easyBtn = document.querySelector('#easybtn');
var hardBtn = document.querySelector('#hardbtn');**/

/**easyBtn.addEventListener('click', function() {
  //Change colors to 3
  numSquares = 3;
  colors = colorGenerator(numSquares);
  pickedColor = pickColor();
  //Add CSS
  easyBtn.classList.add('selected');
  hardBtn.classList.remove('selected');
  for (var i = 0; i < square.length; i++) {
    if (colors[i]) {
      square[i].style.backgroundColor = colors[i];
    } else {
      square[i].style.display = 'none';
    }
  }
  display.textContent = pickedColor;
  h1.style.backgroundColor = 'steelblue';

});

hardBtn.addEventListener('click', function() {
  //Change colors to 3
  numSquares = 6;
  colors = colorGenerator(numSquares);
  pickedColor = pickColor();
  //Add CSS
  easyBtn.classList.remove('selected');
  hardBtn.classList.add('selected');
  for (var i = 0; i < square.length; i++) {
    if (colors[i]) {
      square[i].style.backgroundColor = colors[i];
      square[i].style.display = 'block';
    }
  }
  display.textContent = pickedColor;
  h1.style.backgroundColor = 'steelblue';
});**/

resetButton.addEventListener('click', function() {
  //Generate new colors
  colors = colorGenerator(numSquares);
  //Set the new winning color
  pickedColor = pickColor();
  //Change color display
  messageDisplay.textContent = "";
  this.textContent = "New Colors";
  display.textContent = pickedColor;
  //Change the color of the squares
  for (var i = 0; i < square.length; i++) {
    if (colors[i]) {
      square[i].style.display = 'block';
      square[i].style.backgroundColor = colors[i];
    } else {
      square[i].style.display = 'none';
    }

  }
  //backgroundColor reset
  h1.style.backgroundColor = "steelblue";
  resetButton.textContent = "New Colors";
});

display.textContent = pickedColor;


for (var i = 0; i < square.length; i++) {
  // Add Coloer to Squares
  square[i].style.backgroundColor = colors[i];

  // Add Event Listener to all Squares
  square[i].addEventListener('click', function functionName() {
    var clicked = this.style.backgroundColor;
    // Compare the Selected
    if (clicked === pickedColor) {
      messageDisplay.textContent = "Correct";
      correctColor(clicked);
      resetButton.textContent = "Play Again ?";
      h1.style.backgroundColor = clicked;
    } else {
      this.style.backgroundColor = "#232323";
      messageDisplay.textContent = 'Try Again';
    }
  })
}

function correctColor(color) {
  for (var i = 0; i < square.length; i++) {
    square[i].style.background = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function colorGenerator(num) {
  var arr = []

  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  var r = Math.floor(Math.random() * 255 + 1);
  var g = Math.floor(Math.random() * 255 + 1);
  var b = Math.floor(Math.random() * 255 + 1);

  return 'rgb(' + r + ", " + g + ", " + b + ")";
}
