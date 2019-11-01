export const repetitionAvoider = (timeUnit, timeLength, seconds) => {
  if (seconds / timeLength > 1) {
    let timeUnitAmount = Math.floor(seconds / timeLength);
    seconds = seconds % timeLength;
    if (timeUnit === 1) return `1 ${timeUnit} `;
    else {
      return `${timeUnitAmount} ${timeUnit}s `;
    }
  } else return "";
};

export const secondsToTimeString2 = seconds => {
  let readableString = "";
  readableString += repetitionAvoider("year", 31536000, seconds);
  seconds = seconds % 31536000;
  readableString += repetitionAvoider("day", 86400, seconds);
  seconds = seconds % 86400;
  readableString += repetitionAvoider("hour", 3600, seconds);
  seconds = seconds % 3600;
  readableString += repetitionAvoider("minute", 60, seconds);
  seconds = seconds % 60;
  // if (seconds === 1) {
  //   readableString += "1 second";
  // } else {
  //   readableString += `${seconds} seconds`;
  // }
  return readableString;
};
