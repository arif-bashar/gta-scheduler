import getAllAvailability from "./getAllAvailability";
import getLabs from "./getLabs";


class workingLabs {
    constructor() {
        this.Student = "default";
        this.labs = [];
    }
}


const getSchedules = (gtasFile, coursesFile) => {

    let allAvailability = getAllAvailability(gtasFile);

    let allWorkingLabs = [];

    //fills array with all potential labs
    for (let i = 0; i < allAvailability.length; i++) {
        allWorkingLabs.push(getPossibleLabs(coursesFile, allAvailability[i]));
    }

    return allWorkingLabs;
}


function getPossibleLabs(coursesFile, available) 
{
    let allLabs = getLabs(coursesFile);

    let potentialLabs = new workingLabs();
    
    potentialLabs.Student = available.Student;

    for (let i = 0; i < allLabs.length; i++)
    {
        let flag = false;
        //if lab meets on monday, check availability of gta on monday
        if (allLabs[i].Days.M === true) {
            for (let j = 0; j < available.M.length; j++) {
                if (((allLabs[i].Begin >= available.M[j][0]) && 
                    allLabs[i].End <= available.M[j][1])) {
                        //if it does work, go on to check Tuesday
                        flag = true;
                }
            }
            //Stop checking for this lab and continue to next lab
            if (flag === false){
                continue;
            }
        }

        flag = false;
        //Tuesday
        if (allLabs[i].Days.T === true) {
            for (let j = 0; j < available.T.length; j++) {     
                if (((allLabs[i].Begin >= available.T[j][0]) && 
                    allLabs[i].End <= available.T[j][1])) {
                        flag = true;
                }
            }
            if (flag === false){
                continue;
            }
        }

        flag = false;
        //Wednesday
        if (allLabs[i].Days.W === true) {
            for (let j = 0; j < available.W.length; j++) {     
                if (((allLabs[i].Begin >= available.W[j][0]) && 
                    allLabs[i].End <= available.W[j][1])) {
                        flag = true;
                }
            }
            if (flag === false){
                continue;
            }
        }

        flag = false;
        //Thursday
        if (allLabs[i].Days.R === true) {
            for (let j = 0; j < available.R.length; j++) {     
                if (((allLabs[i].Begin >= available.R[j][0]) && 
                    allLabs[i].End <= available.R[j][1])) {
                        flag = true;
                }
            }
            if (flag === false){
                continue;
            }
        }

        flag = false;
        //Friday
        if (allLabs[i].Days.F === true) {
            for (let j = 0; j < available.F.length; j++) {     
                if (((allLabs[i].Begin >= available.F[j][0]) && 
                    allLabs[i].End <= available.F[j][1])) {
                        flag = true;
                }
            }
            if (flag === false){
                continue;
            }
        }

        potentialLabs.labs.push(allLabs[i]); 
    }

    return potentialLabs;
}


export default getSchedules;