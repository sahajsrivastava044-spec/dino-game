const obstacle = document.querySelector('.obstacle');
const dino = document.querySelector('.dino');
const gameArea = document.querySelector('.game-area');
const startScreen = document.querySelector('.start-screen');
const gameOverScreen = document.querySelector('.game-over');
const restartBtn = document.querySelector('#restart-btn');
const scoreDisplay = document.querySelector('#score');
const levelDisplay = document.querySelector('#level');
const highScoreDisplay = document.querySelector('#high-score');
const memePopup = document.querySelector('.meme-popup');
const memeDiv = document.querySelector('.meme-popup div');

// Frame sets for each state
const runFrames = [
  "./images/png/Run (1).png",
  "./images/png/Run (2).png",
  "./images/png/Run (3).png",
  "./images/png/Run (4).png",
  "./images/png/Run (5).png",
  "./images/png/Run (6).png",
  "./images/png/Run (7).png",
  "./images/png/Run (8).png"
];

const jumpFrames = [
  "./images/png/Jump (1).png",
  "./images/png/Jump (2).png",
  "./images/png/Jump (3).png",
  "./images/png/Jump (4).png",
  "./images/png/Jump (5).png",
  "./images/png/Jump (6).png",
  "./images/png/Jump (7).png",
  "./images/png/Jump (8).png",
  "./images/png/Jump (9).png",
  "./images/png/Jump (10).png",
  "./images/png/Jump (11).png",
  "./images/png/Jump (12).png"
];

const deadFrames = [
  "./images/png/Dead (1).png",
  "./images/png/Dead (2).png",
  "./images/png/Dead (3).png",
  "./images/png/Dead (4).png",
  "./images/png/Dead (5).png",
  "./images/png/Dead (6).png",
  "./images/png/Dead (7).png",
  "./images/png/Dead (8).png"
];

const idleFrames = [
  "./images/png/Idle (1).png",
  "./images/png/Idle (2).png",
  "./images/png/Idle (3).png",
  "./images/png/Idle (4).png",
  "./images/png/Idle (5).png",
  "./images/png/Idle (6).png",
  "./images/png/Idle (7).png",
  "./images/png/Idle (8).png",
  "./images/png/Idle (9).png",
  "./images/png/Idle (10).png"
];

// Gameplay Meme Pool (shown during Level >= 5)
const memes = [
  "./images/meme/borat-borat-dance.gif",
  "./images/meme/i-used-to-pray-for-times-like-this.gif",
  "./images/meme/iamhemuk-xhk.gif",
  "./images/meme/mbappé-football.gif",
  "./images/meme/rolando-ronaldo.gif",
  "./images/meme/squid-game-front-man.gif",
  "./images/meme/therealryan.gif",
  "./images/meme/unexpected-win-election-win.gif"
];

// Death Sad Meme Pool (shown on Game Over)
const sadMemes = [
  "./images/sad-meme/cat.gif",
  "./images/sad-meme/image.png",
  "./images/sad-meme/sad.gif",
  "./images/sad-meme/tri-sad.gif"
];

// Game and Physics parameters
let gameState = 'START'; // 'START', 'PLAYING', 'GAME_OVER'
let dinoState = 'IDLE';  // 'IDLE', 'RUNNING', 'JUMPING', 'DEAD'

const groundY = 35; // Lowered baseline to 35px so Dino runs on the ground
let y = groundY; 
let vy = 0; 
const gravity = 0.65; 
const jumpForce = 15; 

let position = 1000; 
let speed = 10; 
let bgPosition = 0; 
let score = 0;
let level = 1;
let highScore = localStorage.getItem('highScore') || 0;

let currentFrameIndex = 0;
let animTime = 0;
let scoreTimer = 0;
let lastTime = 0;

// Meme state tracking variables
let memeTimer = 0;
let nextMemeDuration = 0; // Random duration in ms
let lastMemeIndex = -1;

// Update high score display on load
highScoreDisplay.textContent = highScore;

// Controls
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    handleAction();
  }
});

gameArea.addEventListener('click', () => {
  handleAction();
});

restartBtn.addEventListener('click', (e) => {
  e.stopPropagation(); 
  restartGame();
});

function handleAction() {
  if (gameState === 'START') {
    startGame();
  } else if (gameState === 'PLAYING' && dinoState !== 'JUMPING') {
    jump();
  } else if (gameState === 'GAME_OVER') {
    restartGame();
  }
}

function startGame() {
  gameState = 'PLAYING';
  dinoState = 'RUNNING';
  startScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
  hideMeme(); // Hide any active memes on start
  
  // Reset parameters
  score = 0;
  level = 1;
  speed = 10;
  position = 1000;
  y = groundY;
  vy = 0;
  bgPosition = 0;
  scoreTimer = 0;
  currentFrameIndex = 0;
  animTime = 0;
  
  // Reset meme tracking parameters
  memeTimer = 0;
  nextMemeDuration = 0;
  lastMemeIndex = -1;
  
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
}

function jump() {
  dinoState = 'JUMPING';
  vy = jumpForce;
  currentFrameIndex = 0; 
}

function endGame() {
  gameState = 'GAME_OVER';
  dinoState = 'DEAD';
  currentFrameIndex = 0; 
  animTime = 0;
  gameOverScreen.classList.remove('hidden');
  
  showSadMeme(); // Display a random sad meme immediately on death
}

function restartGame() {
  startGame();
}

function triggerNextGameplayMeme() {
  let index;
  // Ensure we select a different meme than the last one if pool allows
  do {
    index = Math.floor(Math.random() * memes.length);
  } while (memes.length > 1 && index === lastMemeIndex);
  
  lastMemeIndex = index;
  const selectedMeme = memes[index];
  
  memeDiv.innerHTML = `<img src="${selectedMeme}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 12px;" />`;
  memePopup.style.display = 'block';
  
  // Choose a random duration between 3.5 and 8 seconds (3500ms to 8000ms)
  nextMemeDuration = 3500 + Math.random() * 4500;
  memeTimer = 0;
}

function showSadMeme() {
  const randomSadMeme = sadMemes[Math.floor(Math.random() * sadMemes.length)];
  memeDiv.innerHTML = `<img src="${randomSadMeme}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 12px;" />`;
  memePopup.style.display = 'block';
}

function hideMeme() {
  memePopup.style.display = 'none';
  memeDiv.innerHTML = '';
}

// Unified Game Loop
function gameLoop(time) {
  if (lastTime === 0) lastTime = time;
  const deltaTime = time - lastTime;
  lastTime = time;

  const cappedDelta = Math.min(deltaTime, 100);

  if (gameState === 'PLAYING') {
    updatePhysics(cappedDelta);
    checkCollisions();
  }

  updateAnimations(cappedDelta);

  requestAnimationFrame(gameLoop);
}

function updatePhysics(deltaTime) {
  const targetFPS = 60;
  const frameRatio = deltaTime / (1000 / targetFPS);

  // Jump physics
  if (dinoState === 'JUMPING') {
    vy -= gravity * frameRatio;
    y += vy * frameRatio;

    if (y <= groundY) {
      y = groundY;
      vy = 0;
      dinoState = 'RUNNING';
    }
  }
  dino.style.bottom = y + 'px';

  // Move obstacle
  const obstacleWidth = obstacle.offsetWidth || 50;
  position -= speed * frameRatio;
  if (position < -obstacleWidth) {
    position = 1000 + Math.random() * 200; 
  }
  obstacle.style.left = position + 'px';

  // Parallax background scrolling
  bgPosition -= (speed * 0.4) * frameRatio;
  gameArea.style.backgroundPositionX = bgPosition + 'px';

  // Time-based score progression
  scoreTimer += deltaTime;
  if (scoreTimer >= 100) {
    scoreTimer -= 100;
    score++;
    scoreDisplay.textContent = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
      highScoreDisplay.textContent = highScore;
    }

    // Level up every 100 points
    if (score % 100 === 0) {
      level++;
      levelDisplay.textContent = level;
      speed += 1.5; 
    }
  }

  // Continuous Meme display logic once Level 5 or higher is reached
  if (level >= 5) {
    memeTimer += deltaTime;
    if (nextMemeDuration === 0 || memeTimer >= nextMemeDuration) {
      triggerNextGameplayMeme();
    }
  } else {
    // Only hide if currently showing (saves rendering cycles)
    if (memePopup.style.display === 'block') {
      hideMeme();
    }
  }
}

function updateAnimations(deltaTime) {
  animTime += deltaTime;

  let currentFrames = idleFrames;
  let frameDelay = 100; 
  let loop = true;

  if (dinoState === 'IDLE') {
    currentFrames = idleFrames;
    frameDelay = 100;
  } else if (dinoState === 'RUNNING') {
    currentFrames = runFrames;
    frameDelay = Math.max(35, 80 - (speed - 10) * 3);
  } else if (dinoState === 'JUMPING') {
    currentFrames = jumpFrames;
    frameDelay = 50;
  } else if (dinoState === 'DEAD') {
    currentFrames = deadFrames;
    frameDelay = 120;
    loop = false; 
  }

  if (animTime >= frameDelay) {
    animTime = 0;
    if (loop) {
      currentFrameIndex = (currentFrameIndex + 1) % currentFrames.length;
    } else {
      if (currentFrameIndex < currentFrames.length - 1) {
        currentFrameIndex++;
      }
    }
  }

  dino.style.backgroundImage = `url('${currentFrames[currentFrameIndex]}')`;
}

function checkCollisions() {
  const dinoRect = dino.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  // Hitbox insets
  const dinoHitbox = {
    left: dinoRect.left + 22,
    right: dinoRect.right - 22,
    top: dinoRect.top + 15,
    bottom: dinoRect.bottom - 5
  };

  const obstacleHitbox = {
    left: obstacleRect.left + 22,
    right: obstacleRect.right - 22,
    top: obstacleRect.top + 15,
    bottom: obstacleRect.bottom
  };

  if (
    dinoHitbox.right > obstacleHitbox.left &&
    dinoHitbox.left < obstacleHitbox.right &&
    dinoHitbox.bottom > obstacleHitbox.top &&
    dinoHitbox.top < obstacleHitbox.bottom
  ) {
    endGame();
  }
}

// Start the loop
requestAnimationFrame(gameLoop);