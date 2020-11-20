import xlsx from "xlsx";

/* Returns an object array of CS Labs 
   Return object: 
   { CRN: string, COURSE: string, TITLE: string, 
   DAYS: string, TIME: string, PROF: string }
*/
const getLabs = (coursesFile) => {
  // Read from the courses spreadsheet and grab the excel sheet
  let coursesBook = xlsx.read(coursesFile, {type: "binary"});
  let coursesSheetName = coursesBook.SheetNames[0];
  let coursesSheet = coursesBook.Sheets[coursesSheetName];

  // Convert from xlsx sheet to JSON
  let courses = xlsx.utils.sheet_to_json(coursesSheet);

  // Object array to hold list of labs
  let labs = [];

  // Keep track of the previous CRN
  let prevCRN = courses[0].CRN;

  // Iterate through all the course objects in the courses sheet
  for (let i = 1; i < courses.length; i++) {
    /* If there is a duplicate course with the same CRN,
      then it is considered a lab */
    if (courses[i].CRN === prevCRN && courses[i].CRSE !== '6050') {

      labs.push({
        CRN: courses[i].CRN,
        Course: courses[i].SUBJ + " " + courses[i].CRSE + " " + courses[i].SEC,
        Title: courses[i].TITLE,
        Cap: courses[i].CAP,
        Days: getDays(courses[i]),
        Begin: parseInt(courses[i].BEGIN),
        End: parseInt(courses[i].END_1),
        Prof: courses[i].FIRST + " " + courses[i].LAST,
        NumGTAs: 1
      });
      if ((labs[labs.length-1].Cap > 45) && !(labs[labs.length-1].Course.includes('3240'))) {
        labs[labs.length-1].NumGTAs = 2;
      }
    }

    // Update the CRN
    prevCRN = courses[i].CRN;
  }

  return labs;
}

// Concatenates all the day properties in each lab object
const getDays = (lab) => {
  let days = {
    M: false,
    T: false,
    W: false,
    R: false,
    F: false
  }

  // Checks if these keys are in the object
  if ("M" in lab) days.M = true;

  if ("T" in lab) days.T = true;

  if ("W" in lab) days.W = true;

  if ("R" in lab) days.R = true;

  if ("F" in lab) days.F = true;

  // Remove the extra whitespace at the end
  // days = days.slice(0, -1);

  return days;
}


export default getLabs;
