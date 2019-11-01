export const repetitionAvoider = (timeUnit, timeLength, seconds) => {
  if (seconds / timeLength > 1) {
    let timeUnitAmount = Math.floor(seconds / timeLength);
    seconds = seconds % timeLength;
    if (timeUnitAmount === 1) return `1 ${timeUnit} `;
    else {
      return `${timeUnitAmount} ${timeUnit}s `;
    }
  } else return "";
};

export const secondsToTimeString2 = seconds => {
  let readableString = "";
  let counter = 0;
  if (seconds >= 31536000) counter++;
  if (seconds >= 86400) counter++;

  readableString += repetitionAvoider("year", 31536000, seconds);
  seconds = seconds % 31536000;
  readableString += repetitionAvoider("day", 86400, seconds);
  seconds = seconds % 86400;
  if (counter < 2) readableString += repetitionAvoider("hour", 3600, seconds);
  seconds = seconds % 3600;
  if ((counter = 0)) readableString += repetitionAvoider("minute", 60, seconds);

  return readableString;
};
