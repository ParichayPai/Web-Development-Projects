let grid = document.getElementById("grid");
let restartButton = document.getElementById("restart");
let closeButton = document.getElementById("closeButton");
let modalButton = document.getElementById("modalButton");
let bombIcon = `<i class="fas fa-bomb fa-3x" style="color:black"></i>`;
let size = 9;
let count = 1;

let getLoc = (min, max) => {
  let bombLoc = Math.floor(Math.random() * (max - min + 1)) + min;
  let loc = document.getElementById(bombLoc.toString());
  if (!loc.classList.contains("bomb")) {
    loc.classList.add("bomb");
  } else {
    getLoc(1, 81);
  }
};

let handleClick = (cell) => {
  if (cell.classList.contains("normal")) {
    cell.style.backgroundColor = "green";
  }
  if (cell.classList.contains("bomb")) {
    gameOver();
  }
};

let createRow = (grid) => {
  let row = document.createElement("div");
  row.setAttribute("class", "row");
  for (let i = 0; i < size; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.selected = false;
    cell.setAttribute("id", count++);
    cell.addEventListener("click", () => handleClick(cell));
    row.appendChild(cell);
  }

  grid.appendChild(row);
};

let initGrid = (grid) => {
  // go.display = "none";
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
