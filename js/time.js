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
  ids = ['#monday', '#tuesday', '#wednesday', '#thursday', '#friday'],
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

// holidays.test1 = [1, 23];
// holidays.test2 = [1, 24];
// holidays.test3 = [1, 27];

// get holidays by API
// async function fetchHolidays() {
//   const response = await fetch('https://holidayapi.com/v1/holidays?country=NZ&year=2018&key=34eab3f8-e49c-4c77-b9bd-17dfe3b24613', {
//     method: 'GET',
//     mode: 'no-cors'
//   });

// https://holidayapi.com/v1/holidays?pretty&country=NZ&year=2019&key=34eab3f8-e49c-4c77-b9bd-17dfe3b24613
// https://publicholiday.co.nz/nz-public-holidays-2020.html
// https://api.asb.co.nz/public/v1/public-holidays?countryCode=NZ&$fields=date,description

// const json = await response.text();
// console.log('holidays:', JSON.stringify(json));
// }
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
// function isEvening() {
//   // detect if closed for today but open the following morning
//   if (hour >= 17 && min >= 30) {
//     if (day === 5) {
//       // set to monday
//       openDay.setDate(openDay.getDate() + 3);
//     }
//     // set to following day
//     openDay.setDate(openDay.getDate() + 1);
//     // set to 'closed'
//     open = false;
//   }
// }

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
      // check if bumped day into the weekend
      isWeekend(); // shifts to monday if needed
      console.log('holiday found', key);

      return true;
    }
  }
  return false;
}

// tests if today, tomorrow, and day after are holidays or the weekend
// each isHoliday() match immediately runs ifWeekend() too
function threeDays() {
  // check for and correct weekend day
  isWeekend();

  // test proposed date object for holiday
  if (isHoliday() === true) {
    console.log('openDay is a holiday, testing day after');
    // set to 'closed'
    open = false;
    if (isHoliday() === true) {
      console.log('still a holiday, testing day after');
      if (isHoliday() === true) {
        console.log('still a holiday, last try then giving up');
        isHoliday();
      }
    }
  }
}

// string values: pre, in, post = (too early, on time, too late)
let status = true;

function isToday() {
  if (hour >= 8) {
    // its 8am+ probably open
    // check 8am and 5pm edgecases

    if (hour === 8 && min <= 30) {
      // pre 8:30am, closed
      status = 'pre';
    }

    if (hour === 22 && min >= 30) {
      // past 5:30, closed
      status = 'post';
      // openDay.setDate(openDay.getDate() + 1);
    }

    if (hour > 19) {
      // 6pm+, closed
      status = 'post';
      // openDay.setDate(openDay.getDate() + 1);
    }

    if (status === true) {
      // within 8:30am - 5:30pm, open
      status = 'in';
    }
  } else {
    // pre 8am, closed
    status = 'pre';
  }
  return status;
}

function applyHTML() {
  // add class to openText row
  document.querySelector(ids[openDay.getDay() - 1]).classList.add('open-text');

  // assign statusText to DOM
  document.querySelector('#status').textContent = `${statusText}`;

  // assign openText to DOM
  document.querySelector(ids[openDay.getDay() - 1]).firstElementChild.textContent = `${openText}`;
}

/*/ begin ordered execution *********************************/

// bump test
// openDay.setDate(openDay.getDate() + 1);

//
let isClosed = true;

if (isWeekend() === true) {
  // today is a weekend day, openDay set to monday
  // test mon, tues wednes for holidays
  // (will land on closest non-holiday, accounts for weekends)
  threeDays();
} else {
  // is weekday
  if (isToday() === 'post') {
    // 5:30pm+, bump open day
    openDay.setDate(openDay.getDate() + 1);

    // retest bumped open-day
    // if (isWeekend() === true) {
    threeDays();
    // }
  } else {
    // today is a workday and not past 5:30pm
    // test if today is a holiday and bump to one after
    if (isHoliday() === true) {
      threeDays();
    } else {
      // is a weekday + 'pre' or 'in' + not a holiday
      if (isToday() === 'in') {
        document.querySelector('#status').style.color = '#060053'; // #56c9f8
        statusText = 'open';
        openText = 'open ⟶ ';
        // change flag
        isClosed = false;
      }
    }
  }
}

if (isClosed === true) {
  document.querySelector('#status').style.color = 'red';
  statusText = 'closed';
  openText = 'next open ⟶ ';
}

// render the fixed week
applyHTML();

// if (status === 'in') {
//   document.querySelector('#status').style.color = '#060053'; // #56c9f8
//   statusText = 'open';
//   openText = 'open ⟶ ';
// } else if (status === 'pre' || status === 'post') {
//   document.querySelector('#status').style.color = 'red';
//   statusText = 'closed';
//   openText = 'next open ⟶ ';
// } else {
//   console.log('status error:', status);
// }

// uses todays date to test, modifies openDay
// isEvening();

// uses openDay to test, modifies openDay
// threeDays();

// test proposed non-holiday openDay
// if (isWeekend() === true) {
//   console.log('openDay pushed into weekend');
// test monday tuesday wednesday for holidays, modifies openDay
// threeDays();
// }
