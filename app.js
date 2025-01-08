let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let scoreX = 0;
let scoreO = 0;
let scoreXElement = document.querySelector("#scoreX");
let scoreOElement = document.querySelector("#scoreO");
let turnIndicator = document.querySelector("#turn-indicator");

let turnO = true; // Tracks the current player (true for O, false for X)
let count = 0; // Tracks the number of moves
/*array can be 1D,2D,3D 
1D
let arr=["apple","mango","litchi"];
//we can access 1D array by writing arr[0],arr[1]...soon
2D
ket arr2=[
["apple","litchi"],
["black","blue"],
["college","hospital"],
];
//we can access 2D array by writing arr2[0][1],arr[1][2]...soon
*/
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset game state
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  boxes.forEach((box) => box.classList.remove("winning-box"));
  updateTurnIndicator();
};

// Reset scores
const resetScores = () => {
  scoreX = 0;
  scoreO = 0;
  updateScores();
};

// Update player scores
const updateScores = () => {
  scoreXElement.innerText = scoreX;
  scoreOElement.innerText = scoreO;
};

// Update the turn indicator
const updateTurnIndicator = () => {
  turnIndicator.innerText = turnO ? "Player O's Turn" : "Player X's Turn";
};

// Highlight winning boxes
const highlightWinningPattern = (pattern) => {
  pattern.forEach((index) => {
    boxes[index].classList.add("winning-box");
  });
};

// Show winner and update scores
const showWinner = (winner) => {
  if (winner === "X") {
    scoreX++;
  } else if (winner === "O") {
    scoreO++;
  }
  updateScores();
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check for a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        highlightWinningPattern(pattern);
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

// Handle game draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable all boxes
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Add hover effect to show potential move
boxes.forEach((box) => {
  box.addEventListener("mouseenter", () => {
    if (!box.disabled) {
      box.innerText = turnO ? "O" : "X";
      box.style.color = "lightgray"; // Preview color
    }
  });

  box.addEventListener("mouseleave", () => {
    if (!box.disabled) {
      box.innerText = ""; // Clear preview
    }
  });

  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "";
      turnO = true;
    }
    box.disabled = true;
    count++;
    updateTurnIndicator();

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Add event listeners for reset and new game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", () => {
  resetGame();
  resetScores();
});
