var p1 = document.getElementById('P1');
var p2 = document.getElementById('P2');
var reset = document.getElementById('reset');
var p1tracker = document.getElementById('p1');
var p2tracker = document.getElementById('p2');
var p1score = 0;
var p2score = 0;
var winningscore = 5;
var gameover = false;
var goal = document.querySelector('input');
var h4 = document.querySelector('h4');


p1.addEventListener('click', function() {
  if (p1score == winningscore) {
    p1tracker.classList.add('winner');
    gameover = true;
    alert('Player 1 wins!');
  }
  if (gameover == false) {
    p1score++;
    document.getElementById('p1').textContent = p1score;
  }
});


p2.addEventListener('click', function() {
  if (p2score == winningscore) {
    p2tracker.classList.add('winner');
    gameover = true;
    return alert("Player 2 wins!");
  }
  if (gameover == false) {
    p2score++;
    document.getElementById('p2').textContent = p2score;
  }
});

function restart() {
  gameover = false;
  p1score = 0;
  p2score = 0;
  document.getElementById('p1').textContent = p1score;
  document.getElementById('p2').textContent = p2score;
  p1tracker.classList.remove('winner');
  p2tracker.classList.remove('winner');

}

goal.addEventListener('change', function() {
  h4.textContent = 'Playing to' + ' ' + this.value;
  winningscore = this.value;
  restart();
})

reset.addEventListener('click', function() {
  restart();
})
