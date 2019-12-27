// Slight variations will occur stemming from months with varying numbers of days. This is more of an approximation.
const get18MonthsAgo = () => {
  const dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  // minus 12 months
  year -= 1;
  for (let i = 0; i < 6; i++) {
    // handle january case
    if (month === 1) {
      month = 12;
      year = year -1;
    } else {
      month = month - 1;
    }
  }
  return {
    cDay: day,
    cMonth: month,
    cYear: year,
  };
};
// check if date is valid
const checkValidDate = (item, cutOffDate) => {
  let day; let month; let year;
  const { cDay, cMonth, cYear } = cutOffDate;
  const dateString = item.snippet.publishedAt.slice(0, 11);
  const indeces = [];
  // Character 'T' denotes end of string. This handles single digit month cases.
  for (let i = 0; i < dateString.length; i++) {
    if (dateString[i] === 'T' || dateString[i] === '-') {
      indeces.push(i);
    }
  }
  year = Number(dateString.slice(0, indeces[0]));
  // if year is more recent than cutoff
  if (year > cYear) {
    return true;
  }
  // if year is older than cutoffYear
  if (year < cYear) {
    return false;
  }
  // if year is same as cutoffYear, we compare months
  if (year === cYear) {
    month = Number(dateString.slice(indeces[0], indeces[1]));
    if (month > cMonth) {
      return true;
    }
    if (month < cMonth) {
      return false;
    }
    if (month === cMonth) {
      // if day is more recent
      day = Number(dateString.slice(indeces[1], indeces[2]));
      return day >= cDay;
    }
  }
};

export {
  get18MonthsAgo,
  checkValidDate,
};
