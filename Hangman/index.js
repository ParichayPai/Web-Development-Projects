let animals = [
  "python",
  "elephant",
  "lion",
  "tiger",
  "wolf",
  "dog",
  "cat",
  "fox",
  "frog",
  "snake"
];
let num = Math.random();
let word = animals[Math.ceil(num * animals.length - 1)];

document.getElementById("letter1").innerHTML = word[0];
document.getElementById("letter2").innerHTML = word[word.length - 1];

let wordContainer = document.getElementById("Word");
let lives = 5;
let heart = document.getElementById("rem");
for (let i = 0; i < lives; i++) {
  heart.innerHTML += `<i class="fas fa-heart fa-4x" id = ${
    "h" + i.toString()
  } ></i>`;
  // document.getElementsByClassName("fas").setAttribute("id", i.toString());
}

let KO = false;
let modalBox = document.getElementById("modalBox");
let closeButton = document.getElementById("closeButton");

closeButton.onclick = () => {
  modalBox.style.display = "none";
};

let gameOver = () => {
  for (let i = 0; i < word.length; i++) {
    document.getElementById(i).innerHTML = "X";
  }
  KO = true;
  modalBox.style.display = "block";
  modalBox.classList.remove("fade");
};

for (let i = 0; i < word.length; i++) {
  let letter = document.createElement("div");
  letter.className = "letter";
  letter.classList.add(word[i]);
  letter.setAttribute("id", i.toString());
  wordContainer.appendChild(letter);
}

const keyPressed = (event) => {
  if (KO) return;
  console.log(event.key);

  let key = event.key.toLowerCase();
  // for (let i = 0; i < word.length; i++) {
  //   if (key === word[i]) {
  //     let pos = document.getElementById(i.toString());
  //     pos.innerHTML = key;
  //   }
  // }
  let letters = document.getElementsByClassName(key);
  if (letters.length === 0) {
    lives--;
    console.log("lives reduced by 1");
    document.getElementById("h" + lives.toString()).style.color = "black";
    if (lives === 0) {
      gameOver();
    }
  }
  for (let i = 0; i < letters.length; i++) {
    letters[i].innerHTML = key;
  }
};
document.addEventListener("keydown", keyPressed);

const reloadfn = () => {
  window.location.reload();
};
document.getElementById("reload").addEventListener("click", reloadfn);
