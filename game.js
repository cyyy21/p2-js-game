
  const gameArea = document.getElementById('world');

  //score 

  let score = document.getElementById('score');
  let finalScore = document.getElementById('finalScore');


//OBSTACLE 
const carObs = document.getElementById('enemy');

const carObs2 = document.getElementById('enemy2');

const carObs3 = document.getElementById('enemy3');

const carObs4 = document.getElementById('enemy4');

//player 

const player = document.getElementById('myCar');

// Controls 

const CONTROLS = {

  left: 'KeyA',

  right: 'KeyD'

}

//START MESSAGE 

const startMessage = document.getElementById('start');

//GAME OVER MESSAGE 

let end = document.getElementById('gameOver');

//set global to trigger  randomspawn 
let intervalId;

//handle key function

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

const steps = 5; //steps of Player

let playerPosition = 149; //middle position of road 

//to move player to left
function moveLeft() {

  playerPosition -= steps;

  player.style.left = playerPosition + 'px';

}

//to move player to right
function moveRight() {

  playerPosition += steps;

  player.style.left = playerPosition + 'px';

  

}

let leftPressed = false;
let rightPressed = false;

//function keyDown
function handleKeyDown(event) {
  if (event.code === CONTROLS.left) {
    leftPressed = true;

  } 

   if (event.code === CONTROLS.right) {
    rightPressed = true;
  }
}

//function keyUp
function handleKeyUp(event) {
  if (event.code === CONTROLS.left) {
    leftPressed = false;

  } 

  if (event.code === CONTROLS.right) {
    rightPressed = false;
  }
}

//start the game in Keys

function controls() {

  // move player to left
  // 0 is max left position (gamearea width - player  )

  if (leftPressed && playerPosition > 0 ) {

    moveLeft();

  

  }

  //move player to right
//299 is max position of right (gamearea width - player)

  if (rightPressed && playerPosition < 299 ) {

    moveRight();

  
  }

  // check for collisions
 

  if (detectCollision(player, carObs) || detectCollision(player, carObs2) || detectCollision(player, carObs3) || detectCollision(player, carObs4)) {
    // game over
   
    stopGame();
   
 return;

  }


  requestAnimationFrame(controls);
}

// function to start animation of road and obstacles
function startAnimate() {

  gameArea.classList.add('moveRoad');

  carObs.classList.add('moveObstacle');
  carObs.style.left = randomSpawn() * 150 + 'px';

  carObs2.classList.add('moveObstacle1');
  carObs2.style.left = randomSpawn() * 150 + 'px';

  carObs3.classList.add('moveObstacle2');
  carObs3.style.left = randomSpawn() * 150 + 'px';

  carObs4.classList.add('moveObstacle3');
  carObs4.style.left = randomSpawn() * 150 + 'px';

  gameArea.classList.add('moveRoad');


}


// function to stop the game
function stopGame() {

  gameArea.classList.remove('moveRoad');

  carObs.classList.remove('moveObstacle');

  carObs2.classList.remove('moveObstacle1');
  
  carObs3.classList.remove('moveObstacle2');
  
  carObs4.classList.remove('moveObstacle3');

end.style.opacity = '1';

finalScore.innerHTML = 'Final Score : ' + count;

score.style.opacity = '0';

count = clearInterval(score1);

clearInterval(intervalId);

}

// function to detect collisions between two elements
function detectCollision(elem1, elem2) {
  let rect1 = elem1.getBoundingClientRect();
  
  let rect2 = elem2.getBoundingClientRect();

  return (
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top &&
    rect1.left < rect2.right &&
    rect1.right > rect2.left
  );
}



document.addEventListener('click', start);
//function to start the game when click .

function start() {

  window.requestAnimationFrame(controls);

  window.requestAnimationFrame(startAnimate);

end.style.opacity = '0'

startMessage.remove();

score1();

score.style.opacity = '1'

count = 0;


intervalId = setInterval(startAnimate, 3000)

}

//SCORE
let count = 0;

document.addEventListener('keypress', score1)

function score1() {
setInterval(myScore, 1000)

function myScore() {
  count++;
  score.innerHTML = count;

}
}


//random spawn 

function randomSpawn() {
  return Math.floor(Math.random() * 2);
}