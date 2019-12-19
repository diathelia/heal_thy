// moight have to give up and use date.js instead

/* getDay returns an int from 0-6   : Sunday    0
                                      Monday    1  0
                                      Tuesday   2  1
                                      Wednesday 3  2
                                      Thursday  4  3
                                      Friday    5  4
                                      Saturday  6  5

getHours returns an int of the hour in 24 hour time, no hour = 0 */

/*/
 *  construct a seperate date object to manipulate into a viable day
 *  for each check, re-set the date object (ordering still important)
/*/

const dateObj = new Date(),
  year = dateObj.getFullYear(),
  month = dateObj.getMonth(),
  date = dateObj.getDate(),
  day = dateObj.getDay(),
  hour = dateObj.getHours(),
  min = dateObj.getMinutes(),
  ids = ["#monday", "#tuesday", "#wednesday", "#thursday", "#friday"],
  today = [month + 1, date];

let open = true,
  holidays = {},
  // used to track which day to highlight as open
  openDay = new Date(),
  // status text ('open' or 'closed')
  statusText,
  // open text ('open' or 'next open')
  openText;

// populate holidays in format [M(M), D(D)] to match the today variable
// (these are invariant to year)
holidays.nyd = [1, 1];
holidays.nyde = [1, 2];
// is mondayised
holidays.waitangi = [6, 3]; // bumped to monday
// is mondayised
holidays.anzac = [4, 25];
holidays.christmas = [12, 25];
holidays.boxing = [12, 26];

// (these change per year)
holidays.easterf = [4, 19];
holidays.easterm = [4, 22];
holidays.queens = [6, 3];
holidays.labour = [10, 28];
// is mondayised
holidays.otago = [3, 25];

// get holidays by API
async function fetchHolidays() {
  const response = await fetch(
    "https://holidayapi.com/v1/holidays?country=NZ&year=2018&key=34eab3f8-e49c-4c77-b9bd-17dfe3b24613",
    {
      method: "GET",
      mode: "no-cors"
    }
  );

  // https://holidayapi.com/v1/holidays?pretty&country=NZ&year=2019&key=34eab3f8-e49c-4c77-b9bd-17dfe3b24613
  // https://publicholiday.co.nz/nz-public-holidays-2020.html
  // https://api.asb.co.nz/public/v1/public-holidays?countryCode=NZ&$fields=date,description

  const json = await response.text();
  console.log("holidays:", JSON.stringify(json));
}

// modifies openDay date object, returns true/false
function isWeekend() {
  if (openDay.getDay() === 0) {
    // set to monday
    openDay.setDate(openDay.getDate() + 1);
    // set to 'closed'
    open = false;
    return true;
  } else if (openDay.getDay() === 6) {
    // set to monday
    openDay.setDate(openDay.getDate() + 2);
    // set to 'closed'
    open = false;
    return true;
  } else {
    return false;
  }
}

// modifies openDay date object
function isEvening() {
  // detect if closed for today but open the following morning
  if (hour >= 17 && min >= 30) {
    if (day === 5) {
      // set to monday
      openDay.setDate(openDay.getDate() + 3);
    }
    // set to following day
    openDay.setDate(openDay.getDate() + 1);
    // set to 'closed'
    open = false;
  }
}

// modifies openDay date object, returns true/false
function isHoliday() {
  // get comparable array from proposed date object
  let test = [openDay.getMonth() + 1, openDay.getDate()];
  // loop through holidays properties by key
  for (var key in holidays) {
    // if proposed day matches a holiday
    if (holidays[key].toString() === test.toString()) {
      // proposed day + 1 is safe
      openDay.setDate(openDay.getDate() + 1);
      return true;
    }
  }
  return false;
}

// tests if today, tomorrow, and day after are holidays
function threeDays() {
  // test proposed date object for holiday
  if (isHoliday() === true) {
    console.log("openDay is a holiday, testing day after");
    // set to 'closed'
    open = false;
    if (isHoliday() === true) {
      console.log("still a holiday, testing day after");
      if (isHoliday() === true) {
        console.log("still a holiday, last try then giving up");
        isHoliday();
      }
    }
  }
}

function applyHTML() {
  // if open is still true, then openDay is still today, therefore check todays hours/mins
  // if todays time is between 8:30am and 5:30pm set status to open
  if (open === true && hour <= 17 && min <= 30 && hour >= 8 && min >= 30) {
    document.querySelector("#status").style.color = "#060053"; // #56c9f8
    statusText = "open";
    openText = "open ⟶ ";
  } else {
    document.querySelector("#status").style.color = "red";
    statusText = "closed";
    openText = "next open ⟶ ";
  }

  // add class to openText row
  document.querySelector(ids[openDay.getDay() - 1]).classList.add("open-text");

  // assign statusText to DOM
  document.querySelector("#status").textContent = `${statusText}`;

  // assign openText to DOM
  document.querySelector(
    ids[openDay.getDay() - 1]
  ).firstElementChild.textContent = `${openText}`;
}

/*/ begin ordered execution *********************************/

// uses todays date to test, modifies openDay
isEvening();

// uses openDay to test, modifies openDay
threeDays();

// test proposed non-holiday openDay
if (isWeekend() === true) {
  console.log("openDay pushed into weekend");
  // test monday tuesday wednesday for holidays, modifies openDay
  threeDays();
}

// render the fixed week
applyHTML();
