const formatDate = (date) => {
  var day = date.getDate();
  if (day < 10) day = `0${day}`;
  var month = date.getMonth();
  if (month < 10) month = `0${month}`;
  var year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const timeStamp = (date) => {
  var day = date.getDate();
  if (day < 10) day = `0${day}`;
  var month = date.getMonth();
  if (month < 10) month = `0${month}`;
  var year = date.getFullYear();
  var hour = date.getHours();
  if (hour < 10) hour = `0${hour}`;
  var minute = date.getMinutes();
  if (minute < 10) minute = `0${minute}`;

  return `${day}/${month}/${year} ${hour}:${minute}`;
};

const rangeCheck = (from, to) => {
  if (
    to.getFullYear() >= from.getFullYear() &&
    to.getMonth() >= from.getMonth() &&
    to.getDate() >= from.getDate()
  ) {
    return true;
  } else {
    return false;
  }
};

export { formatDate, rangeCheck, timeStamp };
