AOS.init({duration: '1000'}); // { disable: "mobile", easing: 'ease-in-out-back' }

/*
// init counter for aos:in:stripe AOS custom animation listener
let c = 0;

document.addEventListener('aos:in:stripe', ({detail}) => {
  // increment counter
  c++;

  if ((c & 1) === 0) {
    // is even --> reset positioning of element
    detail.style.transform = 'translateY(0)';
    // console.log(c, 'even, aos:out');
  } else if (document.body.clientWidth <= 510) {
    // is odd --> animate positioning of element
    detail.style.transform = 'translateY(2vh)';
  } else {
    // is odd --> animate positioning of element
    detail.style.transform = 'translateY(7vh)';
    // console.log(c, 'odd, aos:in');
  }
});
*/

// touch UI fix: closes an open nav when a click is made anywhere on the page except the nav
document.body.addEventListener('click', e => {
  // if nav is open and the target does not contain the click-trick class, close the fuckin nav
  try {
    if (document.querySelector('#nav-check').checked === true && !e.target.className.includes('click-trick')) {
      document.querySelector('#nav-check').checked = false;
      console.log('click-trick');
    }
  } catch {
    console.log('clicked on svg/path elm while nav is open error: Uncaught TypeError: e.target.className.includes is not a function');
  }
});

// normalise where scroll-targets land between Firefox & Chrome with selector aliases
const alias = {};
// set default firefox scroll-targets
alias.contact = '#painting';
alias.doctors = '.doc-grid';
alias.top = 'body';

if (window.chrome) {
  // overwrite aliases with chrome scroll-targets
  alias.contact = '#painting';
  alias.doctors = '.doc-grid';
  alias.top = 'body';
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

// let navOpen = true;

// detect if nav input is checked or not
// document.querySelector('#nav-check').addEventListener('click', e => {
//   if (!navOpen) {
//     navOpen = true;
//   } else {
//     navOpen = false;
//   }
// });

// e.target.id != 'nav-check' &&
// e.target.id != 'nav-btn' &&
// e.target.id != 'nav-btn-label' &&
// e.target.id != 'nav-btn-label-1' &&
// e.target.id != 'nav-btn-label-2' &&
// e.target.id != 'nav-btn-label-3'

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
