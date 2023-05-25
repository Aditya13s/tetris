<!DOCTYPE html>
<html>

<head>
  <title>Tetris</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>

<body>
  <div class="game-container">
    <h1 class="game-title">Tetris</h1>
    <div class="game-wrapper">
      <div class="game-controls">
        <button id="moveLeftButton"><i class="fas fa-arrow-left"></i></button>
        <button id="rotateButton"><i class="fas fa-sync-alt"></i></button>
        <button id="moveRightButton"><i class="fas fa-arrow-right"></i></button>
        <button id="moveDownButton"><i class="fas fa-arrow-down"></i></button>
      </div>
      <canvas id="gameBoard" width="300" height="600"></canvas>

      <div class="scoreboard">
        <div class="score">Score: <span id="score">0</span></div>
        <button id="startOverButton">Start Over</button>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>

</html>
