AOS.init({duration: '1000'}); // { disable: "mobile", easing: 'ease-in-out-back' }

// init counter for aos:in:stripe AOS custom animation listener
let c = 0;

document.addEventListener('aos:in:stripe', ({detail}) => {
  // increment counter
  c++;

  if ((c & 1) === 0) {
    // is even --> reset positioning of element
    detail.style.transform = 'translateY(0)';
    // console.log(c, 'even, aos:out');
  } else {
    // is odd --> animate positioning of element
    detail.style.transform = 'translateY(10vh)';
    // console.log(c, 'odd, aos:in');
  }
});

// not working ... gonna use even/odd triggers of aos:in instead
// document.addEventListener('aos:out:super-duper', ({detail}) => {
//   console.log('animated out', detail);
// });

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
alias.contact = '#stripe';
alias.doctors = '.doc-grid';
alias.top = '#contact';

if (window.chrome) {
  // overwrite aliases with chrome scroll-targets
  alias.contact = '#stripe';
  alias.doctors = '.doc-grid';
  alias.top = '#contact';
}

// scroll listeners
// contact button
document.querySelector('#contact').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector(alias.contact).scrollIntoView({behavior: 'smooth'});
});

// doctors button
document.querySelector('#doctors').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector(alias.doctors).scrollIntoView({behavior: 'smooth'});
});

// back to top button
document.querySelector('#to-top').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector(alias.top).scrollIntoView({behavior: 'smooth'});
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

// ==========================================================================

// init counter for aos:in:stripe AOS custom animation listener
// let cStripe = 0;
// let cInfo = 0;
// let cUrgent = 0;

// document.addEventListener('aos:in:stripe', ({detail}) => {
//   // increment counter
//   // c++;
//   console.log(detail.id);
//   if (detail.id === 'stripe') {
//     cStripe++;
//     ifEvenOdd(cStripe, detail, );
//   } else if (detail.id === 'info') {
//     cInfo++;
//     ifEvenOdd(cInfo, detail, );
//   } else if (detail.id === 'urgent') {
//     cUrgent++;
//     ifEvenOdd(cUrgent, detail, );
//   } else {
//     console.log('error, no detail.id');
//   }
// });

// function ifEvenOdd(c, detail) {
//   // bit test:
//   // if c is odd, aos:in isn't lying
//   // if c is even, aos:in is lying and should be aos:out
//   if ((c & 1) === 0) {
//     // is even --> reset positioning of element
//     detail.style.transform = 'translateY(0)';
//     // console.log(c, 'even, aos:out');
//   } else {
//     // is odd --> animate positioning of element
//     detail.style.transform = 'translateY(20vh)';
//     // console.log(c, 'odd, aos:in');
//   }
// }
