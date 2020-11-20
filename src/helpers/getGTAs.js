import xlsx from "xlsx";
import timeConverter from "./timeConverter";

/* Returns an object array of GTAs 
   Return object: 
   { Student: string, Busy: [{ Days: {}, 
    Begin: int, End: int}], 
   }
*/
const getGTAs = (gtasFile) => {
  // Read from the schedule spreadsheet and grab the excel sheet
  let scheduleBook = xlsx.read(gtasFile, {type: "binary"});
  let scheduleSheetName = scheduleBook.SheetNames[0];
  let scheduleSheet = scheduleBook.Sheets[scheduleSheetName];

  // Convert from xlsx sheet to JSON
  xlsx.utils.sheet_to_json(scheduleSheet);

  // Object array to hold list of gtas
  let gtas = [];
  let gta = {};
  let prevCellVal;

  // console.log(scheduleSheet["A1"]);

  // Iterate through all cells, looking at the A column containing student names
  for (let cell in scheduleSheet) {
    const cellAsString = cell.toString();

    if (
      cellAsString[1] !== "r" &&
      cellAsString[1] !== "m" &&
      cellAsString[1] > 0
    ) {
      if (cellAsString[0] === "A") {
        let value = scheduleSheet[cell].v;
        
        /* We know that student name cell always
          precedes the "CRN:" cell. If there is no student name
          before that cell, throw an error. */
        if (value.includes("CRN:")) {
          // Executes if previous cell value is not a student name
          if (notStudentName(prevCellVal))
            throw new Error("There is a schedule with no student name");
          else {
            gta.Student = prevCellVal;
            gtas.push(gta);
            gta = {};
          }
        }
      }
    }
    prevCellVal = scheduleSheet[cell].v;
  }

  // Still need to extract day and time information
  appendDays(scheduleSheet, gtas);
  appendTime(scheduleSheet, gtas);

  return gtas;
}

// Iterates through spreadsheet to extract day information
const appendDays = (scheduleSheet, gtas) => {
  let busy;
  let sched;
  let index = -1;

  for (let cell in scheduleSheet) {
    const cellAsString = cell.toString();

    if (
      cellAsString[1] !== "r" &&
      cellAsString[1] !== "m" &&
      cellAsString[1] > 0
    ) {
      if (cellAsString[0] === "H") {
        let value = scheduleSheet[cell].v;
        
        if (value === "DAYS" && index < gtas.length) {
          busy = [];
          sched = {};
          index++
        } else {
          sched = {
            Days: getDays(value),
            Begin: 0,
            End: 0,
          }
          busy.push(sched);
          gtas[index].Busy = busy;

        }
      }
    }
  }
}

// Iterates through spreadsheet to extract time information
const appendTime = (scheduleSheet, gtas) => {
  let busy;
  let sched;
  let index = -1;
  let busyIndex = 0;

  for (let cell in scheduleSheet) {
    const cellAsString = cell.toString();

    if (
      cellAsString[1] !== "r" &&
      cellAsString[1] !== "m" &&
      cellAsString[1] > 0
    ) {
      if (cellAsString[0] === "I") {
        let value = scheduleSheet[cell].v;
        
        if (value === "TIME" && index < gtas.length) {
          busy = [];
          sched = {};
          busyIndex = 0;
          index++;
        } else {
          if (value.includes("AM") || value.includes("PM")) {
            let time = value.split("-");
            let begin = timeConverter(time[0]);
            let end = timeConverter(time[1]);

            gtas[index].Busy[busyIndex].Begin = begin;
            gtas[index].Busy[busyIndex].End = end;

            busyIndex++;
          }
        }
      }
    }
  }
}

// If this returns true, it means it is not a student name
const notStudentName = (cellValue) => {
  return cellValue.includes(":");
}

// Concatenates all the day properties in each lab object
const getDays = (value) => {

  // Initialize days object
  let days = {
    M: false,
    T: false,
    W: false,
    R: false,
    F: false
  }

  // Since value is a string that contains "M W F", split it by whitespace
  value = value.split(" "); // returns an array

  // Iterate through the value array and if day is in array, switch bool to true
  for (let i = 0; i < value.length; i++) {
    if ("M" === value[i]) days.M = true;

    if ("T" === value[i]) days.T = true;

    if ("W" === value[i]) days.W = true;

    if ("R" === value[i]) days.R = true;

    if ("F" === value[i]) days.F = true;
  }

  return days;
}

export default getGTAs;