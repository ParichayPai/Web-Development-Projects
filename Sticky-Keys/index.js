let count = 0;

// const stickyKeys = (event) => {
//   btnTimer = window.setTimeout(brkTimer, 5000);
//   if (event.key === "Shift") count++;
//   if (count === 5) {
//     alert("Sticky Keys !!!!");
//     count = 0;
//   }
// };

// const brkTimer = () => {
//   clearTimeout(btnTimer);
// };

// let btnTimer;

// window.addEventListener("keydown", stickyKeys);

window.addEventListener("keydown", (event) => {
  if (event.key === "Shift" && document.shiftTime) {
    count = (count + 1) % 5;
    // console.log(document.shiftTime);
    const diff = Date.now() - document.shiftTime;
    console.log(
      document.shiftTime +
        " " +
        diff +
        " " +
        parseInt(diff / 1000, 10) +
        " " +
        count
    );
    if (parseInt(diff / 1000, 10) > 1) {
      count = 1;
    }
    if (parseInt(diff / 1000, 10) < 5 && count === 0) {
      alert("Sticky Keys");
    }
    document.shiftTime = Date.now();
  } else if (event.key === "Shift") {
    document.shiftTime = Date.now();
  }
});
