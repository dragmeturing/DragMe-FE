import date from "date-and-time";

export const cleanDate = (dateObj) => {
  const dateParts = date
    .parse(`${dateObj.split(" ")[0]}`, "YYYY-MM-DD")
    .toString()
    .split(" ");
  return `${dateParts[0]}, ${dateParts[1]} ${dateParts[2]}`
}

export const cleanTime = dateObj => {
  const formattedTime = date
    .parse(`${dateObj.split(" ")[1].split(".")[0]}`, "hh:mm:ss");
  let cleanTime = date.format(formattedTime, "hh:mm A");
  if (cleanTime[0]) {
    let timeParts = cleanTime.split("");
    timeParts.shift();
    cleanTime = timeParts.join('');
  }
  return cleanTime;
};