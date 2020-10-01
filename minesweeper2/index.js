let grid = document.getElementById("grid");
let restartButton = document.getElementById("restart");
let closeButton = document.getElementById("closeButton");
let modalButton = document.getElementById("modalButton");
let bombIcon = `<i class="fas fa-bomb fa-3x" style="color:black"></i>`;
let exclamationIcon = `<i class="fas fa-exclamation" style="color:red"></i>`;
let scorebox = document.getElementById("score");
let size = 9;
let count = 1;
let score = 0;

let checkNeighbours = (cell) => {
  let c = 0;
  let arr = [];
  arr[0] = document.getElementById((Number(cell.id) + 1).toString());
  arr[1] = document.getElementById((Number(cell.id) - 1).toString());
  arr[2] = document.getElementById((Number(cell.id) + 9).toString());
  arr[3] = document.getElementById((Number(cell.id) - 9).toString());
  arr[4] = document.getElementById((Number(cell.id) + 10).toString());
  arr[5] = document.getElementById((Number(cell.id) - 10).toString());
  arr[6] = document.getElementById((Number(cell.id) + 8).toString());
  arr[7] = document.getElementById((Number(cell.id) - 8).toString());

  if (Number(cell.id) % 9 === 0) {
    arr[0] = null;
    // arr[1] = null;
    // arr[2] = null;
    // arr[3] = null;
    arr[4] = null;
    // arr[5] = null;
    // arr[6] = null;
    arr[7] = null;
  }
  if (Number(cell.id) % 9 === 1) {
    // arr[0] = null;
    arr[1] = null;
    // arr[2] = null;
    // arr[3] = null;
    // arr[4] = null;
    arr[5] = null;
    arr[6] = null;
    // arr[7] = null;
  }

  for (let i = 0; i < 8; i++) {
    if (arr[i] !== null && arr[i].classList.contains("bomb")) {
      c = c + 1;
    }
  }
  cell.innerHTML = c;
};

let getLoc = (min, max) => {
  let bombLoc = Math.floor(Math.random() * (max - min + 1)) + min;
  let loc = document.getElementById(bombLoc.toString());
  if (!loc.classList.contains("bomb")) {
    loc.classList.add("bomb");
  } else {
    getLoc(1, 81);
  }
};

let handleRightClick = (event, cell) => {
  event.preventDefault();
  cell.innerHTML = exclamationIcon;
  cell.style.backgroundColor = "grey";
};

let handleClick = (cell) => {
  if (cell.classList.contains("normal")) {
    cell.style.backgroundColor = "green";
    score += 1;
    scorebox.innerHTML = score;
    checkNeighbours(cell);
  }
  if (score === 71 || cell.classList.contains("bomb")) {
    gameOver();
  }
};

let createRow = (grid) => {
  let row = document.createElement("div");
  row.setAttribute("class", "row");
  for (let i = 0; i < size; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add("center");
    cell.selected = false;
    cell.setAttribute("id", count++);
    cell.addEventListener("click", () => handleClick(cell));
    cell.addEventListener("contextmenu", (event) =>
      handleRightClick(event, cell)
    );
    row.appendChild(cell);
  }

  grid.appendChild(row);
};

let initGrid = (grid) => {
  for (let i = 0; i < size; i++) {
    createRow(grid);
  }
  for (let i = 0; i < 10; i++) {
    getLoc(1, 81);
  }
  setNormal();
};

let setNormal = () => {
  for (let i = 1; i < 82; i++) {
    let cellLocation = document.getElementById(i.toString());
    if (!cellLocation.classList.contains("bomb")) {
      cellLocation.classList.add("normal");
    }
  }
};

let gameOver = () => {
  for (let i = 1; i < 82; i++) {
    let cell = document.getElementById(i.toString());
    if (cell.classList.contains("bomb")) {
      cell.style.backgroundColor = "red";
      cell.innerHTML = bombIcon;
    } else if (cell.classList.contains("normal")) {
      cell.style.backgroundColor = "green";
    }
  }
  score = 0;
  modalButton.click();
};

restartButton.addEventListener("click", (event) => {
  //closeButton.click();
  grid.innerHTML = "";
  count = 1;
  initGrid(grid);
  closeButton.click();
});

initGrid(grid);
