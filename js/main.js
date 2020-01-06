AOS.init({duration: '1000'}); // { disable: "mobile" }

// const buttons = document.querySelectorAll(".button"),
//   weekArrow = document.querySelector("#week-arrow");

/*
document.body.addEventListener("click", e => {
  // if any button is clicked
  if (
    e.target.classList.contains("button") &&
    !e.target.classList.contains("manage-my-health")
  ) {
    // stop browser scrolling <a> target into view
    e.preventDefault();
    // close other buttons
    for (let button of buttons) {
      if (e.target !== button) {
        button.classList.remove("is-active");
      }
    }

    // toggle that buttons transition state
    e.target.classList.toggle("is-active");

    // check for arrow img toggle
    if (e.target.id === "hours-btn") {
      weekArrow.classList.toggle("arrow-flip");
    } else {
      weekArrow.classList.remove("arrow-flip");
    }
  } else if (document.querySelector(".is-active")) {
    // if a non button is clicked
    for (let button of buttons) {
      button.classList.remove("is-active");
    }
    weekArrow.classList.remove("arrow-flip");
  }
});
*/

// normalise where scroll-targets land between Firefox & Chrome with selector aliases
const alias = {};
// set default firefox scroll-targets
alias.doctors = '.doc-grid';

// if (window.chrome) {
//   // overwrite aliases with chrome scroll-targets
//   alias.ourTeam = ".chromePageTarget";
//   alias.page-down = ".chromePageTarget";
// }

// scroll listeners

// doctors button
document.querySelector('#doctors').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector(alias.doctors).scrollIntoView({behavior: 'smooth'});
});

// page-down arrow and goto: emergency hours
// pageDown.addEventListener("click", e => {
//   e.preventDefault();
//   document.querySelector(alias.pageDown).scrollIntoView({ behavior: "smooth" });
// });

// // about us button
// document.querySelector(".aboutUs").addEventListener("click", e => {
//   e.preventDefault();
//   document.querySelector(alias.ourTeam).scrollIntoView({ behavior: "smooth" });
// });

// // map button
// document.querySelector("#seeMap").addEventListener("click", e => {
//   e.preventDefault();
//   document.querySelector("#mapid").scrollIntoView({ behavior: "smooth" });
// });

// // drophours = document.querySelector("#drophours"),
// // timetable = document.querySelector("#timetable"),
// // btnTime = document.querySelectorAll("#drophours, #hours, #timetable");
