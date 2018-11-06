// DOM variables
const left = document.querySelector(".left"),
  right = document.querySelector(".right"),
  container = document.querySelector(".container"),
  pageDown = document.querySelector(".pageDown");

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
alias.ourTeam = "#aboutUsTarget";
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
  console.log(e);
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
