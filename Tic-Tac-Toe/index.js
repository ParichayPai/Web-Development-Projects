let players = [];
let turn = 0;
let gameOver = false;

let dimension = Number(document.getElementById("dim").value);

let board = new Array(dimension)
  .fill("")
  .map(() => new Array(dimension).fill(""));

const changeDimension = (event) => {
  dimension = Number(event.target.value);
  board = new Array(dimension)
    .fill("")
    .map(() => new Array(dimension).fill(""));
};

document.getElementById("dim").addEventListener("change", changeDimension);

const startGame = () => {
  let inp1 = document.getElementById("p1");
  let inp2 = document.getElementById("p2");
  // let btn = document.getElementById("start");

  let pl1 = inp1.value;
  let pl2 = inp2.value;

  if (isEmpty(pl1) || isEmpty(pl2)) {
    // || isEmpty(dim)) {
    alert("Data missing");
    return;
  }

  // inp1.setAttribute("disabled", true);
  document.getElementById("hide1").style.display = "none";
  document.getElementById("hide2").style.display = "none";
  document.getElementById("hide3").style.display = "none";
  document.getElementById("start").style.display = "none";

  // inp2.setAttribute("disabled", true);
  // btn.setAttribute("disabled", true);

  let game = document.getElementById("game-container");
  game.classList.remove("hide");

  players.push(pl1);
  players.push(pl2);

  initGame();
};

const calculateWinner = () => {
  let count = 0;
  if (turn < dimension + 1) return false;

  // Row check
  for (let i = 0; i < dimension; i++) {
    count = 0;
    for (let j = 1; j < dimension; j++) {
      if (board[i][j] === board[i][j - 1] && board[i][j] !== "") {
        count++;
      }
    }
    if (count === dimension - 1) return true;
  }

  //Column check
  for (let i = 0; i < dimension; i++) {
    count = 0;
    for (let j = 1; j < dimension; j++) {
      if (board[j][i] === board[j - 1][i] && board[j][i] !== "") {
        count++;
      }
    }
    if (count === dimension - 1) return true;
  }

  // Diagnal 1
  count = 0;
  for (let i = 1; i < dimension; i++) {
    if (board[i][i] === board[i - 1][i - 1] && board[i][i] !== "") {
      count++;
    }
  }
  if (count === dimension - 1) return true;

  // Diagnal 2
  count = 0;
  for (let i = 1; i < dimension; i++) {
    if (
      board[i][dimension - i - 1] === board[i - 1][dimension - i] &&
      board[i][dimension - i - 1] !== ""
    ) {
      count++;
    }
  }
  if (count === dimension - 1) return true;

  return false;
};

// const calculateWinner = () => {
//   if (turn < dimension + 1) {
//     return false;
//   }
//   // for(let i = 0; i < dimension; i++){

//   // }
//   const winnerCombination = [
//     ["00", "01", "02"],
//     ["10", "11", "12"],
//     ["20", "21", "22"],
//     ["00", "10", "20"],
//     ["01", "11", "21"],
//     ["02", "12", "22"],
//     ["00", "11", "22"],
//     ["02", "11", "20"]
//   ];

//   for (let i = 0; i < winnerCombination.length; i++) {
//     let [val0, val1, val2] = winnerCombination[i];

//     if (
//       board[val0[0]][val0[1]] !== "" &&
//       board[val0[0]][val0[1]] === board[val1[0]][val1[1]] &&
//       board[val0[0]][val0[1]] === board[val2[0]][val2[1]]
//     )
//       return true;
//   }
// };

const reloadfn = () => {
  window.location.reload();
};

document.getElementById("reload").addEventListener("click", reloadfn);

const handleClick = (cell, i, j) => {
  // console.log("hello");
  let el = cell;

  if (el.innerHTML !== "") {
    // || gameOver) {
    return;
  }

  // let id = el.id;
  // let i = parseInt(id[0]);
  // let j = parseInt(id[1]);

  board[i][j] = turn % 2 === 0 ? "X" : "O";
  if (board[i][j] === "X")
    el.innerHTML = '<i class="fas fa-times" style = "color:black;"></i>';
  else el.innerHTML = '<strong style="font-weight: bold;">O</strong>';
  turn++;

  document.getElementById("turn").innerHTML = players[turn % 2] + " 's turn";
  if (calculateWinner()) {
    gameOver = true;
    document.getElementById("modalbtn").click();
    document.getElementById("whowon").innerHTML = players[turn % 2] + " won";

    // let fin = prompt("Wanna play again? Type y or n");
    // switch (fin) {
    //   case "y":
    //     gameRestart();
    //     break;
    //   case "n":
    //     board = [];
    //     break;
    //   default:
    //     return;
    // }
  }

  if (checkIfDraw()) {
    if (calculateWinner()) {
      alert(players[turn % 2] + " won");
      document.getElementById("modalbtn").click();
      return;
    }
    document.getElementById("modalbtn").click();
    document.getElementById("whowon").innerHTML = "It's a tie !!!!";
    // let fin = prompt("It's a Draw. Wanna play again? Type y or n");
    // switch (fin) {
    //   case "y":
    //     gameRestart();
    //     break;
    //   case "n":
    //     board = [];
    //     break;
    //   default:
    //     return;
    // }
  }
};

const isEmpty = (value) => !value;

const initGame = () => {
  turn = 0;
  let gameContainer = document.getElementById("game-container");
  for (let i = 0; i < dimension; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < dimension; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("id", i.toString() + j.toString());
      cell.className = "cell";
      cell.addEventListener("click", (event) => handleClick(cell, i, j));
      row.appendChild(cell);
    }
    gameContainer.appendChild(row);
  }
};

let checkIfDraw = () => {
  let count = 0;
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      if (document.getElementById(i.toString() + j.toString()).innerHTML !== "")
        count++;
    }
  }
  if (count === dimension * dimension) return true;
  else return false;
};

let gameRestart = () => {
  window.location.reload();
  // let cleansing = document.getElementsByClassName("cell");
  // cleansing.innerHTML = "";
  // for (let i = 0; i < dimension; i++) {
  //   for (let j = 0; j < dimension; j++) {
  //     board[i][j] = "";
  //     document.getElementById(i.toString() + j.toString()).innerHTML = "";
  //   }
  // }
  // turn = 0;
  // document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
};
