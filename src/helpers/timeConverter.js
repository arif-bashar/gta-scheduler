function timeConverter(time) {
  let PM = time.match("PM") ? true : false;

  time = time.split(":");
  let hour;

  let min = time[1];
  min = min.substring(0, 2);

  if (PM) {
    hour = parseInt(time[0], 10);
    if (hour !== 12)
      hour = 12 + parseInt(time[0], 10);
  } else {
    hour = time[0];
  }

  let result = hour + min;
  return parseInt(result);
}

export default timeConverter;
