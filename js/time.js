/* getDay returns an int from 0-6   : Sunday    0
                                      Monday    1  0
                                      Tuesday   2  1
                                      Wednesday 3  2
                                      Thursday  4  3
                                      Friday    5  4
                                      Saturday  6  5
                                      
getHours returns an int of the hour in 24 hour time, no hour = 0 */
const dateObj = new Date(),
  year = dateObj.getFullYear(),
  month = dateObj.getMonth(),
  date = dateObj.getDate(),
  day = dateObj.getDay(),
  hour = dateObj.getHours(),
  ids = ["#monday", "#tuesday", "#wednesday", "#thursday", "#friday"],
  timeInfo = {},
  holidays = {},
  today = [month + 1, date],
  tomorrow = [month + 1, date + 1],
  dayAfter = [month + 1, date + 2];

// flag for permeable holidays
let isHoliday = false;

// populate holidays in format [M(M), D(D)] to match the today variable
// (these are invariant to year)
holidays.nyd = [1, 1];
holidays.nyde = [1, 2];
holidays.waitangi = [6, 2];
holidays.anzac = [4, 25];
holidays.christmas = [12, 25];
holidays.boxing = [12, 26];
// holidays.test1     = [9, 2];
// holidays.test2     = [9, 3];
// holidays.test3     = [9, 4];

// (these change per year)
// [easter days]
// [queens bday]
// [labour day]
// [otago anniversary day]

// console.log(today, tomorrow, dayAfter);

function checkHolidays() {
  // detect special closed day
  for (var key in holidays) {
    if (holidays[key].toString() == today.toString()) {
      document.querySelector(ids[day]).style.fontWeight = "bold";
      isHoliday = true;
      console.log(1);

      if (holidays[key].toString() == tomorrow.toString()) {
        document.querySelector(ids[day]).style.fontWeight = "normal";
        document.querySelector(ids[day + 1]).style.fontWeight = "bold";
        isHoliday = true;
        console.log(2);

        if (holidays[key].toString() == dayAfter.toString()) {
          document.querySelector(ids[day + 1]).style.fontWeight = "normal";
          document.querySelector(ids[day + 2]).style.fontWeight = "bold";
          isHoliday = true;
          console.log(3);
        }
      }
    } else {
      console.log("not a holiday");
    }
  }

  if (isHoliday === false) {
    getTimeInfo();
  } else {
    // wtf
    applyHTML();
  }
}

// set time-related HTML
function getTimeInfo() {
  // detect if its the weekend
  if (day === 0 || day === 6) {
    timeInfo.special = "weekend";

    // therefore monday should be emphasised
    document.querySelector("#monday").style.fontWeight = "bold";
  }

  // detect if its closed for today but open the following morning
  else if (
    hour >= 18 &&
    !(day === 5 || day === 6) &&
    timeInfo.special !== "weekend"
  ) {
    timeInfo.special = "evening";

    // therefore day + 1 should be emphasised
    document.querySelector(ids[day]).style.fontWeight = "bold";
  }

  // detect if earlier than 8am on a weekday
  else if (hour < 8 && timeInfo.special !== "weekend") {
    timeInfo.special = "morning";

    // therefore day should be emphasised
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

// set up time
checkHolidays();
