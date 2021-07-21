const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let CIRCLE_TURN;
const CellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winningMessage");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.getElementById("restartButton");
const playerX = document.querySelector(".player-x");
const playerCircle = document.querySelector(".player-circle");
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const startGame = () => 
{
  winningMessage.classList.remove("show");
  winningMessageText.innerText = "";
  CIRCLE_TURN = false;
  CellElements.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.removeEventListener('click', onClickHandler);
    cell.addEventListener("click", onClickHandler, { once: true });
  });
  setBoardHoverClass();
  showPlayerTurn();
}

restartButton.addEventListener("click", () => {
  startGame();
});

const showPlayerTurn = () => {
  const circleTriangle = playerCircle.querySelector(".triangle-up");
  const xTriangle = playerX.querySelector(".triangle-up");
  if(CIRCLE_TURN)
  {
    xTriangle.classList.remove("show");
    circleTriangle.classList.add("show");
  }
  else
  {
    xTriangle.classList.add("show");
    circleTriangle.classList.remove("show");
  }
}

const onClickHandler = (event) => {
  const cell = event.target;
  const className = CIRCLE_TURN ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, className);
  if(checkWin(className))
  {
    showMessage(false);
  }
  else if(checkDraw())
  {
    showMessage(true);
  }
  else
  {
    swapTurn();
    showPlayerTurn();
    setBoardHoverClass();    
  }

};

const placeMark = (cell, className) => 
{
  cell.classList.add(className);
}

const swapTurn = () => {
  CIRCLE_TURN = !CIRCLE_TURN;
}

const setBoardHoverClass = () => {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if(CIRCLE_TURN)
  {
    board.classList.add(CIRCLE_CLASS);
  }
  else
  {
    board.classList.add(X_CLASS);
  }
}

const checkWin = (className) => {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => CellElements[index].classList.contains(className));
  })
}

const checkDraw = () => {
  return [...CellElements].every(
    (element) =>
      element.classList.contains("x") || element.classList.contains("circle")
  );
}

const showMessage = (draw) => {
  if(!draw)
  {
    winningMessage.classList.add("show");
    winningMessageText.innerText =
      (CIRCLE_TURN ? "Player 2 (O)" : "Player 1 (X)") + " Wins!";
  }
  else if(draw)
  {
    winningMessage.classList.add("show");
    winningMessageText.innerText = "Draw!";
  }
}

startGame();

