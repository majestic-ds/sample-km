import moment from 'moment';

export function isValidISOString(timeString: string) {
  return moment(timeString, moment.ISO_8601, true).isValid();
}

type Units =
  | 'year'
  | 'years'
  | 'month'
  | 'months'
  | 'day'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'past';

interface Response {
  value: number;
  unit: Units;
}
export function getTimeDifference(isoString: string): Response | null {
  if (!isValidISOString(isoString)) {
    return null;
  }
  // Parse the ISO string using Moment.js
  const targetDate = moment(isoString);

  // Get the current time using Moment.js
  const currentTime = moment();

  // Calculate the duration
  const duration = moment.duration(targetDate.diff(currentTime));

  // Get the duration in days, hours, and minutes
  const years = duration.years();
  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  // Determine the appropriate unit (days, hours, or minutes)
  let unit: Units = 'days';
  let value;
  if (years > 0) {
    unit = years === 1 ? 'year' : 'years';
    value = years;
  } else if (months > 0) {
    unit = months === 1 ? 'month' : 'months';
    value = months;
  } else if (days > 0) {
    unit = days === 1 ? 'day' : 'days';
    value = days;
  } else if (hours > 0) {
    unit = 'hours';
    value = hours;
  } else if (minutes > 0) {
    unit = 'minutes';
    value = minutes;
  } else {
    unit = 'past';
    value = 0;
  }

  // Return an object containing the value and unit
  return {value, unit};
}
