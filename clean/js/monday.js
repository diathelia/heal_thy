// @param is a proposed date object
// does not modify the openDay date object
function isHoliday(proposal) {
  // get comparable array from proposed date object
  let test = [proposal.getMonth() + 1, proposal.getDate()];
  // loop through holidays properties by key
  for (var key in holidays) {
    // if proposed day matches a holiday (short circuited by checking month first)
    if (holidays[key] == test) {
      // proposed day + 1 is safe
      console.log("is holiday");
      // proposal.setDate(proposal.getDate + 1);
      return true;
    }
  }
  return false;
}

// first find the coming monday to check against isHoliday()
// is called from testMonday, returns a monday date object
function findMonday() {
  let dayCopy = day,
    mondayObj = new Date();

  for (let i = 0; i < 8; i++) {
    // unless today is monday, keep it pushin'
    if (dayCopy !== 1) {
      // add one to the monday date object
      mondayObj.setDate(mondayObj.getDate() + 1);
      // add one to the weekday counter
      dayCopy++;
    }

    // catch sat-sun wrap-around
    if (dayCopy === 7) {
      dayCopy = 0;
    }

    // return monday as date object
    if (dayCopy === 1) {
      return mondayObj;
    }
  }
}

function testMonday() {
  // test findMonday()
  if (
    findMonday().toLocaleDateString("en-US", { weekday: "long" }) === "Monday"
  ) {
    console.log(findMonday().toLocaleDateString("en-US", { weekday: "long" }));
    // construct monday array
    let monday = [findMonday().getMonth() + 1, findMonday().getDate()];
    console.log(monday); // expect todays date until midnight

    // check if monday is a holiday
    if (isHoliday(findMonday()) === true) {
      // check if tuesday is a holiday
      if (isHoliday(findMonday().setDate(monday().getDate() + 1)) === true) {
        // assume wedensday is a work day
        console.log("wednesday is a workday");
      } else {
        // assume tuesday is a work day
        console.log("tuesday is a workday");
      }
    } else {
      // assume monday is a work day
      console.log("monday is a workday");
    }
  } else {
    console.log("failed to find monday");
  }
}
