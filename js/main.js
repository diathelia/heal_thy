// when a button gains focus, if that specific button is clicked while in focus, then remove that focus
// const hovers = document.querySelectorAll(".hover");

// hovers.forEach(hover => {
//   hover.addEventListener("touchstart", e => {
//     e.preventDefault();
//     hover.classList.add("hover");
//   });
//   hover.addEventListener("touchend", e => {
//     e.preventDefault();
//     hover.classList.remove("hover");
//   });
// });

// DOM variables
const left = document.querySelector(".left"),
  right = document.querySelector(".right"),
  container = document.querySelector(".container"),
  pageDown = document.querySelector(".pageDown"),
  buttons = document.querySelectorAll(".mini-button");

// [test] directly mimic hover effect for touch screen
buttons.forEach(button => {
  button.addEventListener("touchstart", e => {
    button.classList.add("hover");
  });
  button.addEventListener("touchend", e => {
    button.classList.remove("hover");
  });
});

// splash page image hover
left.addEventListener("mouseenter", () => {
  container.classList.add("hover-left");
});

left.addEventListener("mouseleave", () => {
  container.classList.remove("hover-left");
});

right.addEventListener("mouseenter", () => {
  container.classList.add("hover-right");
});

right.addEventListener("mouseleave", () => {
  container.classList.remove("hover-right");
});

// normalise where scroll-targets land between Firefox & Chrome with selector aliases
const alias = {};
// set default firefox scroll-targets
alias.ourTeam = ".brent";
alias.pageDown = "#emergency-wrap";

if (window.chrome) {
  // overwrite aliases with chrome scroll-targets
  alias.ourTeam = ".chromePageTarget";
  alias.pageDown = ".chromePageTarget";
}

// scroll listeners

// page-down arrow and goto: emergency hours
pageDown.addEventListener("click", e => {
  e.preventDefault();
  document.querySelector(alias.pageDown).scrollIntoView({ behavior: "smooth" });
});

// our team button
document.querySelector(".ourTeam").addEventListener("click", e => {
  e.preventDefault();
  document.querySelector(alias.ourTeam).scrollIntoView({ behavior: "smooth" });
});

// about us button
document.querySelector(".aboutUs").addEventListener("click", e => {
  e.preventDefault();
  document.querySelector(alias.ourTeam).scrollIntoView({ behavior: "smooth" });
});

// map button
document.querySelector("#seeMap").addEventListener("click", e => {
  e.preventDefault();
  document.querySelector("#mapid").scrollIntoView({ behavior: "smooth" });
});

// drophours = document.querySelector("#drophours"),
// timetable = document.querySelector("#timetable"),
// btnTime = document.querySelectorAll("#drophours, #hours, #timetable");

// btnTime.forEach(selector => {
//   selector.addEventListener("click", () => {

//   });

//   if (drophours.style.padding !== "") {
//     console.log("non-zero padding");
//   }

//   selector.addEventListener("focusout", () => {
//     console.log("focusout");
//     shouldToggle = true;
//   });
//   if (shouldToggle === true) {
//     console.log("shouldToggle = true");
//     selector[0].blur();
//     selector[1].blur();
//     selector[2].blur();
//   }
// });
