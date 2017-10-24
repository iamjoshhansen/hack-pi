const MILLISECOND = 1;
const SECOND = MILLISECOND * 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const YEAR = DAY * 365;

export default (duration:number) : string => {

  const ret = [];
  let left = duration;

  // Years
  const years = Math.floor(left / YEAR);
  if (years > 0) {
    ret.push(`${years}y`);
    left -= (years * YEAR);
  }

  // Weeks
  const weeks = Math.floor(left / WEEK);
  if (weeks > 0) {
    ret.push(`${weeks}w`);
    left -= (weeks * WEEK);
  }

  // Days
  const days = Math.floor(left / DAY);
  if (days > 0) {
    ret.push(`${days}d`);
    left -= (days * DAY);
  }

  // Hours
  const hours = Math.floor(left / HOUR);
  if (hours > 0) {
    ret.push(`${hours}h`);
    left -= (hours * HOUR);
  }

  // minutes
  const minutes = Math.floor(left / MINUTE);
  if (minutes > 0) {
    ret.push(`${minutes}m`);
    left -= (minutes * MINUTE);
  }

  // seconds
  const seconds = Math.floor(left / SECOND);
  if (seconds > 0) {
    ret.push(`${seconds}s`);
    left -= (seconds * SECOND);
  }

  // milliseconds
  const milliseconds = Math.floor(left / MILLISECOND);
  if (milliseconds > 0) {
    ret.push(`${milliseconds}i`);
    left -= (milliseconds * MILLISECOND);
  }

  if (duration < 0) {
    ret.push('ago');
  }

  return ret.join(' ');
}
