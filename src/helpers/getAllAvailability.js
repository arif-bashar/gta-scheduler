// Adds helper functions
import getGTAs from "./getGTAs";

//initializing availability class to open availability
class availability {
    constructor() {
        this.Student = "default";
        this.M = [[600, 2000]];
        this.T = [[600, 2000]];
        this.W = [[600, 2000]];
        this.R = [[600, 2000]];
        this.F = [[600, 2000]];   
    };
}

//gets all availabilities for all gtas
const getAllAvailability = (gtasFile) => {
    let gtas = getGTAs(gtasFile);

    // Object array to hold list of schedules 
    let gtasAvailable = []; 
    
    //iterating through gtas
    for(let i = 0; i < gtas.length; i++) {
        gtasAvailable.push(getAvailability(gtas[i]));
        
    }

    return gtasAvailable;
};

//passes in gta object that has properties Student and Busy
function getAvailability(gta) {
    let available = new availability();

    available.Student = gta.Student;

    //in the case that the gta has no classes
    if (gta.hasOwnProperty('Busy') === false){
        return available;
    }

    //in the case that the gta has at least one class
    //narrows down availability of each student by looking at what classes they're taking
    for (let i = 0; i < gta.Busy.length; i++) {
        //Monday 
        if (gta.Busy[i].Days.M === true) {
            for (let j = 0; j < available.M.length; j++) {
                if ((gta.Busy[i].Begin >= available.M[j][0]) &&
                     (gta.Busy[i].End <= available.M[j][1])) {
                        
                        available.M.push([gta.Busy[i].End, available.M[j][1]]);
                        available.M[j][1] = gta.Busy[i].Begin;
                    }
            }
        }
        //Tuesday
        if (gta.Busy[i].Days.T === true) {
            for (let j = 0; j < available.T.length; j++) {
                if ((gta.Busy[i].Begin >= available.T[j][0]) &&
                     (gta.Busy[i].End <= available.T[j][1])) {
                        
                        available.T.push([gta.Busy[i].End, available.T[j][1]]);
                        available.T[j][1] = gta.Busy[i].Begin;
                        
                }
            }   
        }
        //Wednesday
        if (gta.Busy[i].Days.W === true) {
             for (let j = 0; j < available.W.length; j++) {
                if ((gta.Busy[i].Begin >= available.W[j][0]) &&
                     (gta.Busy[i].End <= available.W[j][1])) {
                        
                        available.W.push([gta.Busy[i].End, available.W[j][1]]);
                        available.W[j][1] = gta.Busy[i].Begin;
                        
                }
            }      
        }
        //Thursday
        if (gta.Busy[i].Days.R === true) {
            for (let j = 0; j < available.R.length; j++) {
                if ((gta.Busy[i].Begin >= available.R[j][0]) &&
                     (gta.Busy[i].End <= available.R[j][1])) {
                        
                        available.R.push([gta.Busy[i].End, available.R[j][1]]);
                        available.R[j][1] = gta.Busy[i].Begin;
                        
                }
            }           
        }
        //Friday
        if (gta.Busy[i].Days.F === true) {
            for (let j = 0; j < available.F.length; j++) {
                if ((gta.Busy[i].Begin >= available.F[j][0]) &&
                     (gta.Busy[i].End <= available.F[j][1])) {
                        
                        available.F.push([gta.Busy[i].End, available.F[j][1]]);
                        available.F[j][1] = gta.Busy[i].Begin;
                        
                }
            }           
        }
    }
    return available;
}

export default getAllAvailability;