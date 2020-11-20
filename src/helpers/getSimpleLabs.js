import getSchedules from "./getSchedules";


class SimpleSchedule {
    constructor() {
        this.Student = "default"; 
        this.labs = [];
    }
}

//gets simple labs for all gtas
const getSimpleLabs = (gtasFile, coursesFile) => {
    let allSchedules = getSchedules(gtasFile, coursesFile);

    let allGTASimpleLabs = [];

    for (let i = 0; i < allSchedules.length; i++) {
        allGTASimpleLabs.push(listLabs(allSchedules[i]));
    }

    return allGTASimpleLabs;
}

//checks to see if two labs times overlap at all
function sameTime(lab1, lab2){

    if ((lab1.Begin === lab2.Begin) || 
        (lab1.Begin > lab2.Begin && lab1.Begin < lab2.End) || 
        (lab2.Begin > lab1.Begin && lab2.Begin < lab1.End))
    {
            return true;
    }
    else {
        return false;
    }

}

function listLabs(workingLabs) {
    let simpleLabs = [];
    let simpleSchedule = new SimpleSchedule();
    simpleSchedule.Student = workingLabs.Student;

    //console.log(workingLabs.Student);
    let skip_lab = []; //labs to not add to simpleLabs to avoid duplicates
    //loop through labs for a GTA, if the lab does not overlap with other labs for GTA, just add it to simpleLabs
    let items = []; //labs that do overlap , made up of 2 element arrays
    for(let i = 0; i < workingLabs.labs.length; i++) {

            //loop thorugh rest of labs to check for overlapping times
            for(let j = i + 1; j < workingLabs.labs.length; j++) {

                //check if all days are same
                //Monday
                if ((workingLabs.labs[i].Days.M === true) && (workingLabs.labs[j].Days.M === true)) {
                    //Check if times are same on that day
                    if (sameTime(workingLabs.labs[i], workingLabs.labs[j]))
                        {
                            skip_lab.push(workingLabs.labs[j]);
                            skip_lab.push(workingLabs.labs[i]);
                            items.push([workingLabs.labs[i], workingLabs.labs[j]]);
                            continue;
                        }                
                }
                //Tuesday
                if ((workingLabs.labs[i].Days.T === true) && (workingLabs.labs[j].Days.T === true)) {
                    
                    if (sameTime(workingLabs.labs[i], workingLabs.labs[j])) 
                        {
                            skip_lab.push(workingLabs.labs[j]);
                            skip_lab.push(workingLabs.labs[i]);
                            items.push([workingLabs.labs[i], workingLabs.labs[j]]);
                            continue;                   
                      }
                }
                //Wednesday
                if ((workingLabs.labs[i].Days.W === true) && (workingLabs.labs[j].Days.W === true)) {
                    
                    if (sameTime(workingLabs.labs[i], workingLabs.labs[j]))
                        {
                            skip_lab.push(workingLabs.labs[j]);
                            skip_lab.push(workingLabs.labs[i]);
                            items.push([workingLabs.labs[i], workingLabs.labs[j]]);
                            continue;                
                      }
                }
                //Thursday
                if ((workingLabs.labs[i].Days.R === true) && (workingLabs.labs[j].Days.R === true)) {
                    
                    if (sameTime(workingLabs.labs[i], workingLabs.labs[j]))
                        {
                            skip_lab.push(workingLabs.labs[j]);
                            skip_lab.push(workingLabs.labs[i]);
                            items.push([workingLabs.labs[i], workingLabs.labs[j]]);
                            continue;                  
                      }
                }
                //Friday
                if ((workingLabs.labs[i].Days.F === true) && (workingLabs.labs[j].Days.F === true)) {
                    
                    if (sameTime(workingLabs.labs[i], workingLabs.labs[j]))  
                        {
                            skip_lab.push(workingLabs.labs[j]);
                            skip_lab.push(workingLabs.labs[i]);
                            items.push([workingLabs.labs[i], workingLabs.labs[j]]);
                            continue;               
                        }
                }
    
            }
            
    }

    for(let i = 0; i < workingLabs.labs.length; i++) {
        //if this lab is not overlapping at all
        if(!(skip_lab.includes(workingLabs.labs[i]))){
            simpleLabs.push(workingLabs.labs[i]);
        }
    }

    //Now append the pairs that are overlapping
    simpleSchedule.duplicates = items;

    simpleSchedule.labs = simpleLabs;
    return simpleSchedule;
}



export default getSimpleLabs;