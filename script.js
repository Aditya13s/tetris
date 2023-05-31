const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
const ROW = 20;
const COL = 10;
const SQ = 30;
const VACANT = "white";

const moveButtons = document.getElementById('moveButtons');

    function adjustMoveButtonsPosition() {
      if (window.innerWidth <= 768) {
        moveButtons.classList.add('game-controls-mobile');
      } else {
        moveButtons.classList.remove('game-controls-mobile');
      }
    }

    // Adjust move buttons position on initial page load
    adjustMoveButtonsPosition();

    // Adjust move buttons position on window resize
    window.addEventListener('resize', adjustMoveButtonsPosition);

canvas.style.background = "#f0f0f0"; // Set a background color
// canvas.style.backgroundImage = "url('background.jpg')"; // Set a background image
canvas.style.width = "300px"; // Set canvas width
canvas.style.height = "600px"; // Set canvas height
canvas.style.border = "1px solid #000000"; // Add a border
canvas.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)"; // Add a box shadow


// draw a square
function drawSquare(x, y, color) {
    const gradient = ctx.createLinearGradient(x * SQ, y * SQ, (x + 1) * SQ, (y + 1) * SQ);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "white");
  
    ctx.fillStyle = gradient;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
  
    ctx.strokeStyle = "black";
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// create the board
let board = [];
for (r = 0; r < ROW; r++) {
  board[r] = [];
  for (c = 0; c < COL; c++) {
    board[r][c] = VACANT;
  }
}

// draw the board
function drawBoard() {
  for (r = 0; r < ROW; r++) {
    for (c = 0; c < COL; c++) {
      drawSquare(c, r, board[r][c]);
    }
  }
}

drawBoard();

const Z = [
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0]
  ]
];

const S = [
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1]
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0]
  ]
];

const T = [
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0]
  ]
];

const O = [
  [
    [1, 1],
    [1, 1]
  ]
];

const L = [
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0]
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ]
];

const I = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ]
];

const J = [
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ]
];

// Create an array to store all the shapes
const tetrominoes = [Z, S, T, O, L, I, J];

// the pieces and their colors
const PIECES = [
  [Z, "#f39c12"],
  [S, "#2ecc71"],
  [T, "#9b59b6"],
  [O, "#3498db"],
  [L, "#e74c3c"],
  [I, "#1abc9c"],
  [J, "#f1c40f"]
];

// generate random pieces
function randomPiece() {
  let r = Math.floor(Math.random() * PIECES.length);
  return new Piece(PIECES[r][0], PIECES[r][1]);
}

let p = randomPiece();

// the Object Piece
function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;

  this.tetrominoN = 0;
  this.activeTetromino = this.tetromino[this.tetrominoN];

  this.x = 3;
  this.y = -2;
}

// fill function
Piece.prototype.fill = function (color) {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // we draw only occupied squares
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, color);
      }
    }
  }
};

// draw a piece to the board
Piece.prototype.draw = function () {
  this.fill(this.color);
};

// undraw a piece
Piece.prototype.unDraw = function () {
  this.fill(VACANT);
};

// move down the piece
Piece.prototype.moveDown = function () {
  if (!this.collision(0, 1, this.activeTetromino)) {
    this.unDraw();
    this.y++;
    this.draw();
  } else {
    // lock the piece and generate a new one
    this.lock();
    p = randomPiece();
  }
};

// move right the piece
Piece.prototype.moveRight = function () {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x++;
    this.draw();
  }
};

// move left the piece
Piece.prototype.moveLeft = function () {
  if (!this.collision(-1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x--;
    this.draw();
  }
};

// rotate the piece
Piece.prototype.rotate = function () {
  let nextPattern = this.tetromino[
    (this.tetrominoN + 1) % this.tetromino.length
  ];
  let kick = 0;

  if (this.collision(0, 0, nextPattern)) {
    if (this.x > COL / 2) {
      // it's the right wall
      kick = -1; // we need to move the piece to the left
    } else {
      // it's the left wall
      kick = 1; // we need to move the piece to the right
    }
  }

  if (!this.collision(kick, 0, nextPattern)) {
    this.unDraw();
    this.x += kick;
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1)%4 => 1
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
  }
};

let score = 0;

// collision function
Piece.prototype.collision = function (x, y, piece) {
  for (r = 0; r < piece.length; r++) {
    for (c = 0; c < piece.length; c++) {
      // if the square is empty, we skip it
      if (!piece[r][c]) {
        continue;
      }

      // coordinates of the piece after the movement
      let newX = this.x + c + x;
      let newY = this.y + r + y;

      // conditions
      if (newX < 0 || newX >= COL || newY >= ROW) {
        return true;
      }

      // skip newY < 0; board[-1] will crush our game
      if (newY < 0) {
        continue;
      }

      // check if there is a locked piece already in place
      if (board[newY][newX] !== VACANT) {
        return true;
      }
    }
  }
  return false;
};

// lock function
Piece.prototype.lock = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // we skip vacant squares
      if (!this.activeTetromino[r][c]) {
        continue;
      }

      // pieces to lock on top = game over
      if (this.y + r < 0) {
        alert("Game Over");
        // stop request animation frame
        gameOver = true;
        break;
      }

      // we lock the piece
      board[this.y + r][this.x + c] = this.color;
    }
  }

  // remove full rows
  for (r = 0; r < ROW; r++) {
    let isRowFull = true;
    for (c = 0; c < COL; c++) {
      isRowFull = isRowFull && board[r][c] !== VACANT;
    }
    if (isRowFull) {
      // if the row is full
      // we move down all the rows above it
      for (y = r; y > 1; y--) {
        for (c = 0; c < COL; c++) {
          board[y][c] = board[y - 1][c];
        }
      }

      // the top row board[0][..] has no row above it
      for (c = 0; c < COL; c++) {
        board[0][c] = VACANT;
      }

      // increment the score
      score += 10;
    }
  }

  // update the board
  drawBoard();
 const scoreElement = document.getElementById('score');

  // update the score
  scoreElement.innerHTML = score;
};

// control the piece
document.addEventListener("keydown", control);

function control(event) {
  if (event.keyCode === 37) {
    p.moveLeft();
  } else if (event.keyCode === 38) {
    p.rotate();
  } else if (event.keyCode === 39) {
    p.moveRight();
  } else if (event.keyCode === 40) {
    p.moveDown();
  }
}
const moveLeftButton = document.getElementById("moveLeftButton");
const rotateButton = document.getElementById("rotateButton");
const moveRightButton = document.getElementById("moveRightButton");
const moveDownButton = document.getElementById("moveDownButton");

let holdInterval; // Variable to store the hold interval

// Function to handle button click or touch end
function handleButtonClick() {
  clearInterval(holdInterval); // Clear the hold interval
  const buttonId = this.id;
  if (buttonId === "moveLeftButton") {
    p.moveLeft();
  } else if (buttonId === "rotateButton") {
    p.rotate();
  } else if (buttonId === "moveRightButton") {
    p.moveRight();
  } else if (buttonId === "moveDownButton") {
    p.moveDown();
  }
}

// Function to handle touch and hold
function handleTouchHold() {
  const buttonId = this.id;
  if (holdInterval) {
    clearInterval(holdInterval); // Clear the hold interval if it's already set
  }
  holdInterval = setInterval(function() {
    if (buttonId === "moveLeftButton") {
      p.moveLeft();
    } else if (buttonId === "rotateButton") {
      p.rotate();
    } else if (buttonId === "moveRightButton") {
      p.moveRight();
    } else if (buttonId === "moveDownButton") {
      p.moveDown();
    }
  }, 200); // Adjust the interval duration as per your needs
}

// Add click event listeners
moveLeftButton.addEventListener("click", handleButtonClick);
rotateButton.addEventListener("click", handleButtonClick);
moveRightButton.addEventListener("click", handleButtonClick);
moveDownButton.addEventListener("click", handleButtonClick);

// Add touch event listeners for touch and hold
moveLeftButton.addEventListener("touchstart", handleTouchHold);
rotateButton.addEventListener("touchstart", handleTouchHold);
moveRightButton.addEventListener("touchstart", handleTouchHold);
moveDownButton.addEventListener("touchstart", handleTouchHold);
moveLeftButton.addEventListener("touchend", handleButtonClick);
rotateButton.addEventListener("touchend", handleButtonClick);
moveRightButton.addEventListener("touchend", handleButtonClick);
moveDownButton.addEventListener("touchend", handleButtonClick);
moveLeftButton.addEventListener("touchcancel", handleButtonClick);
rotateButton.addEventListener("touchcancel", handleButtonClick);
moveRightButton.addEventListener("touchcancel", handleButtonClick);
moveDownButton.addEventListener("touchcancel", handleButtonClick);


// drop the piece every 1sec
let dropStart = Date.now();
let gameOver = false;

function drop() {
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > 1000) {
    p.moveDown();
    dropStart = Date.now();
  }
  if (!gameOver) {
    requestAnimationFrame(drop);
  }
}

drop();

// ...

// Create the "Start Over" button
const startOverButton = document.getElementById("startOverButton");
const scoreElement = document.getElementById("score");

// Event listener for the "Start Over" button
startOverButton.addEventListener("click", startOver);

// ...

// The startOver function to reset the game
function startOver() {
  board = [];
  for (let r = 0; r < ROW; r++) {
    board[r] = [];
    for (let c = 0; c < COL; c++) {
      board[r][c] = VACANT;
    }
  }
  score = 0;
  gameOver = false;
  scoreElement.innerHTML = score;

  p = randomPiece();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();

  drop();
}

