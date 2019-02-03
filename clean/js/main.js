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
  // FIREFOX DOES NOT APPLY CSS HOVER @MEDIA CORRECTLY --> DESKTOP STILL USES FOCUS
  // my logic needs to ensure that if the device has no meaningful hover,
  // then,
  // apply this click + focus code to mimic 'unhover'

  // when a button gains focus, if that specific button is clicked while in focus, then remove that focus
  buttons = document.querySelectorAll(".mini-button"),
  drophours = document.querySelector("#drophours"),
  timetable = document.querySelector("#timetable"),
  btnTime = document.querySelectorAll("#drophours, #hours, #timetable");

let prepHours = false,
  shouldToggle = false;

btnTime.forEach(selector => {
  selector.addEventListener("click", () => {
    prepHours = true;
  });

  if (drophours.style.padding !== "") {
    console.log("non-zero padding");
  }

  selector.addEventListener("focusout", () => {
    console.log("focusout");
    shouldToggle = true;
    // btnTime[0].blur();
    // btnTime[1].blur();
    // btnTime[2].blur();

    // selector.blur();
    // document.querySelector("#left-img").click();
  });
  if (shouldToggle === true) {
    console.log("shouldToggle = true");
    selector[0].blur();
    selector[1].blur();
    selector[2].blur();
  }
});

// boolean toggle for revealing and hiding the timetable
// false = hidden
// true  = revealed
let hoursToggle = false;

// boolean toggle mimicing 'unhover' behaviour for all buttons
let btnToggle = false;

// NEW HOVER TESTING
buttons.forEach(button => {
  button.addEventListener("touchstart", e => {
    button.classList.add("hover");
  });
  button.addEventListener("touchend", e => {
    button.classList.remove("hover");
  });
});

//     console.log(e.target);
//     // e.preventDefault();
//     // if a btn is open and its not the timetable
//     if (btnToggle === true && hoursToggle === false) {
//       console.log("button is open, closing..");
//       e.target.blur();
//       // reset toggle
//       btnToggle = false;
//     }
//     // init first click
//     btnToggle = true;
//   });
// });

// drophours.addEventListener("click", e => {
//   e.preventDefault();
//   console.log(e.target);

//   if (hoursToggle === false) {
//     // open the timetable
//     console.log("opening");
//     document.querySelector("#week-arrow").style.transform = "rotate(-180deg)";
//     hoursToggle = true;
//   } else {
//     // close the timetable
//     console.log("closing");
//     document.querySelector("#week-arrow").style.transform = "rotate(0deg)";
//     hoursToggle = false;
//     drophours.blur();
//   }
// });

// hover listeners (remember to test aliases to mobile events)
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
