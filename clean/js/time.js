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
  ids = ["#monday", "#tuesday", "#wednesday", "#thursday", "#friday"],
  today = [month + 1, date];

let open = true,
  holidays = {},
  // used to track which day to highlight as open
  openDay = new Date();

// populate holidays in format [M(M), D(D)] to match the today variable
// (these are invariant to year)
holidays.nyd = [1, 1];
holidays.nyde = [1, 2];
holidays.waitangi = [6, 2];
holidays.anzac = [4, 25];
holidays.christmas = [12, 25];
holidays.boxing = [12, 26];
holidays.today = [1, 29];
holidays.tomorrow = [1, 30];
holidays.dayAfter = [1, 31];
holidays.dayAfterAfter = [2, 1];
holidays.mondayAfter = [2, 4];

// (these change per year)
// holidays.easter
// holidays.queens
// holidays.labour
// holidays.otago

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
    console.log("was saturday --> monday");
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
  if (hour >= 18) {
    if (day === 5) {
      console.log("is friday evening: setting to monday");
      // set to monday
      openDay.setDate(openDay.getDate() + 3);
    }
    console.log("is evening");
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
    // if proposed day matches a holiday (short circuited by checking month first)
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
    console.log("openDay is a holiday, testing day after", openDay);
    // set to 'closed'
    open = false;
    if (isHoliday() === true) {
      console.log("still a holiday, testing day after");
      if (isHoliday() === true) {
        // assume the day after is not a holiday
        console.log("still a holiday, last try then giving up");
        // if false, openDay doesn't change, if true, it does
        isHoliday();
      }
    }
  }
}

function applyHTML() {
  let status;

  // if open is still true, then openDay is still today, therefore can simply check todays hour
  if (open === true && hour >= 18) {
    status = "closed";
  } else {
    status = "open";
  }

  // assign open / closed to DOM
  document.querySelector(
    "#hours"
  ).innerHTML = `<span style="color: red">${status}</span>
                 <span class="see-week">hours</span>
                 <img src="img/baseline-keyboard_arrow_down-24px.svg" id="week-arrow" alt="see weekly hours">
                `;
}

/*/ begin ordered execution *********************************/

// uses todays date to test, modifies openDay
isEvening();

// test bump
// openDay.setDate(openDay.getDate() + 1);

// uses openDay to test, modifies openDay
threeDays();

// test proposed non-holiday openDay
if (isWeekend() === true) {
  // openDay is now set to monday
  // test monday tuesday wednesday for holidays
  console.log("holidays pushed openDay into weekend");
  threeDays();
}

// now safe to use openDay
document.querySelector(ids[openDay.getDay() - 1]).style.fontWeight = "bold";

// uses open/closed flag and renders the fixed week
applyHTML();
