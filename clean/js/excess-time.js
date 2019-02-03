// moight have to give up and use date.js instead

/* getDay returns an int from 0-6   : Sunday    0
                                      Monday    1  0
                                      Tuesday   2  1
                                      Wednesday 3  2
                                      Thursday  4  3
                                      Friday    5  4
                                      Saturday  6  5

getHours returns an int of the hour in 24 hour time, no hour = 0 */

/*
1. run holiday checks first, noting if today and following 3 days are holidays.
2. mark next valid working day after holiday, regardless of landing on the w.e.
3. assume: if any holiday has been noted, then
3. run weekend check,

1. isWeekend(); --> proposal = "monday" if true, "today" if false
2. isHoliday(proposal); --> proposal = "monday || monday + {1,2,3}";
3. if (isWeekend = false) {}

keep breaking up functions, come up with an order which eliminates edge cases
if weekend --> check holidays from monday onward
if weekday(wed/thurs/fri) --> check holidays from today and check monday and tuesday for holidays
if thurs+fri are holidays, check monday and tuesday
isTodayValid --> no --> check tomorrow for weekend/holiday --> yes -->



*/
const dateObj = new Date(),
  year = dateObj.getFullYear(),
  month = dateObj.getMonth(),
  date = dateObj.getDate(),
  day = dateObj.getDay(),
  hour = dateObj.getHours(),
  ids = ["#monday", "#tuesday", "#wednesday", "#thursday", "#friday"],
  today = [month + 1, date],
  tomorrow = [month + 1, date + 1],
  dayAfter = [month + 1, date + 2],
  dayAfterAfter = [month + 1, date + 3];

let timeInfo = {},
  holidays = {};

// populate holidays in format [M(M), D(D)] to match the today variable
// (these are invariant to year)
holidays.nyd = [1, 1];
holidays.nyde = [1, 2];
holidays.waitangi = [6, 2];
holidays.anzac = [4, 25];
holidays.christmas = [12, 25];
holidays.boxing = [12, 26];
holidays.today = [1, 26];
holidays.tomorrow = [1, 27];
holidays.dayAfter = [1, 28];
holidays.dayAfterAfter = [1, 29];

// for (var key in holidays) {
//   console.log(holidays[key].toString(), today.toString());
//   console.log(holidays[key], today);
// }
// (these change per year)
// holidays.easter
// holidays.queens
// holidays.labour
// holidays.otago

// console.log(today, tomorrow, dayAfter);

// returns next available monday or false
function isWeekend() {
  if (day === 0) {
    return tomorrow;
  } else if (day === 6) {
    return dayAfter;
  } else {
    return false;
  }
}

function isEvening() {
  // detect if closed for today but open the following morning
  if (hour >= 18) {
    if (day === 5) {
      // open on monday --> no need to run isWeekend()
      return dayAfterAfter;
    }
    return tomorrow;
  } else {
    return today;
  }
}

// check if friday evening
if (isEvening()[1] === date + 3) {
  // check if proposed monday is a holiday
  isHoliday(dayAfterAfter);
}

// check if weekend
else if (isWeekend() !== false) {
  // check if proposed monday is a holiday
  isHoliday(isWeekend());
} else {
  // must be valid weekday --> check if evening
  isHoliday(isEvening());
}

function isHoliday(proposal) {
  // i want to return which days are holidays.
  // if today is sat or sun, i need to check monday and tuesday

  // detect special closed day
  for (var key in holidays) {
    // check if today is a holiday
    if (holidays[key].toString() == today.toString()) {
      // document.querySelector(ids[day - 1]).style.fontWeight = "normal";
      // document.querySelector(ids[day]).style.fontWeight = "bold";
      timeInfo.today = ids[day - 1];
    }
    // check if tomorrow is a holiday
    if (holidays[key].toString() == tomorrow.toString()) {
      // document.querySelector(ids[day]).style.fontWeight = "normal";
      // document.querySelector(ids[day + 1]).style.fontWeight = "bold";
      timeInfo.tomorrow = ids[day];
    }
    // check if the day after tomorrow is a holiday
    if (holidays[key].toString() == dayAfter.toString()) {
      // document.querySelector(ids[day + 1]).style.fontWeight = "normal";
      // document.querySelector(ids[day + 2]).style.fontWeight = "bold";
      timeInfo.dayAfter = ids[day + 1];
    }
    // check if the day after after tomorrow is a holiday
    if (holidays[key].toString() == dayAfterAfter.toString()) {
      // document.querySelector(ids[day + 2]).style.fontWeight = "normal";
      // document.querySelector(ids[day + 3]).style.fontWeight = "bold";
      timeInfo.dayAfterAfter = ids[day + 2];
    }
  }

  // check for easter
  if (timeInfo.today && timeInfo.dayAfterAfter && day === 5) {
    // then today is a friday and a holiday, and the coming monday is a holiday too
    timeInfo.easter = "friday";
    document.querySelector("#tuesday").style.fontWeight = "bold";
  }

  // if (timeInfo.today) {
  //   handleWeek();
  // }
  if (timeInfo.tomorrow || timeInfo.dayAfter || timeInfo.dayAfterAfter) {
    // holiday handled
    handleWeek();
  } else {
    handleWeek();
    // wtf
    // applyHTML();
  }
}

// set time-related HTML for a non-holiday today
function handleWeek() {
  // from here, i want to know which post-holiday day has been marked as open
  // i need to check its not sat/sun, and i need to check
  // if (nextWorkDay > 0 && nextWorkDay < 6) {
  //   console.log("proposed post-holiday workday is a weekday");
  // }

  // detect if its the weekend
  // if (day === 0 || day === 6) {
  //   timeInfo.special = "weekend";
  //   if ((day === 0 && timeInfo.tomorrow) || (day === 6 && timeInfo.dayAfter)) {
  //     // then monday is a holiday
  //     document.querySelector("#tuesday").style.fontWeight = "bold";
  //   } else {
  //     // monday should be emphasised
  //     document.querySelector("#monday").style.fontWeight = "bold";
  //   }
  // }

  // detect if its closed for today but open the following morning
  if (hour >= 18 && !(day === 5 || day === 6)) {
    timeInfo.special = "evening";

    // therefore tomorrow should be emphasised
    document.querySelector(ids[day]).style.fontWeight = "bold";
  }

  // detect if earlier than 8am on a weekday
  else if (hour < 8 && timeInfo.special !== "weekend") {
    timeInfo.special = "morning";

    // therefore today should be emphasised
    document.querySelector(ids[day - 1]).style.fontWeight = "bold";
  }
  applyHTML();
}

function applyHTML() {
  // correct html to inject
  let answer;

  // if a special case was handled, button should say closed
  if (timeInfo.special) {
    console.log("timeInfo.special = ", timeInfo.special);
    answer =
      '<span style="color: red">closed</span><span class="see-week">hours</span>' +
      '<img src="img/baseline-keyboard_arrow_down-24px.svg" id="week-arrow" alt="see weekly hours">';
  } else {
    console.log("no special case detected, must be open!");

    // no special case --> button should say open
    answer =
      '<span style="color: red">open</span><span class="see-week">hours</span>' +
      '<img src="img/baseline-keyboard_arrow_down-24px.svg" id="week-arrow" alt="see weekly hours">';

    // emphasise whatever the current day is
    document.querySelector(ids[day - 1]).style.fontWeight = "bold";
  }

  // assign correct html to DOM
  document.querySelector("#hours").innerHTML = answer;
}

// checkHolidays() --> handleWeek() ||
// checkHolidays();

// A free script from: www.mresoftware.com
// determines if daylight savings is in effect and the user is in the southern hemisphere
function DST2() {
  var today = new Date();
  var yr = today.getFullYear();
  var jan = new Date(yr, 0); // January 1
  var jul = new Date(yr, 6); // July 1
  // northern hemisphere test
  if (
    jan.getTimezoneOffset() > jul.getTimezoneOffset() &&
    today.getTimezoneOffset() != jan.getTimezoneOffset()
  ) {
    return false;
  }
  // southern hemisphere test
  if (
    jan.getTimezoneOffset() < jul.getTimezoneOffset() &&
    today.getTimezoneOffset() != jul.getTimezoneOffset()
  ) {
    return true;
  }
  // if we reach this point, DST is not in effect on the client computer.
  return false;
}
