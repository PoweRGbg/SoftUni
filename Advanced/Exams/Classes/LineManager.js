class LineManager {
    // TODO: implement this class
    /* {
            name: String,
            timeToNext: Number
        }
    */
    constructor(stops) {
        this.stops = [];
        this.currentStop = '';
        this.duration = 0;
        this.delay = 0;
        this.currentIndex = 0;

        stops.forEach(element => {
            if (element.name != '' && element.timeToNext >= 0) {
                this.stops.push(element);
            } else {
                this.e('Error at initialization')
            }

        });

    }

    get atDepot() {
        return this.currentIndex+1 >= this.stops.length;
    }

    get nextStopName() {
        if (this.atDepot) {
            return 'At depot.';
        } else {
            return this.stops[this.currentIndex + 1];
        }
    }

    get currentDelay(){
        return this.delay;
    }

    arriveAtStop(minutes){
        if(minutes <0){
            this.e('minutes cannot be negative')
        } else if(this.atDepot){
            this.e('last stop reached')
        } else {
            this.duration += minutes;
            this.delay +=  minutes - this.stops[this.currentIndex].timeToNext;
            this.currentStop = this.stops[this.currentIndex+1].name;
            this.currentIndex +=1;
            if(this.atDepot){
                return false;
            } else {
                return true;
            }
        }
    }

    toString(){
        let completed = this.atDepot?`Course completed`:this.stops[this.currentIndex+1].name;
        let result = `Line summary\n- Next stop: ${completed}\n- Stops covered: ${this.currentIndex}\n- Time on course: ${this.duration} minutes\n- Delay: ${this.delay} minutes`;
        return result;
    }

    // currentIndex {
    //     for (let index = 0; index < this.stops.length; index++) {
    //         if (this.currentStop == this.stops[index].name && index != 0) {
    //             return index;
    //         }
    //     }
    //     return 0;
    // }
    e(message) {
        throw new Error(message);
    }
}

// Initialize a line manager with correct values
const man = new LineManager([
    { name: 'Depot', timeToNext: 4 },
    { name: 'Romanian Embassy', timeToNext: 2 },
    { name: 'TV Tower', timeToNext: 3 },
    { name: 'Interpred', timeToNext: 4 },
    { name: 'Dianabad', timeToNext: 2 },
    { name: 'Depot', timeToNext: 0 },
]);

// Travel through all the stops until the bus is at depot
while (man.atDepot === false) {
    console.log(man.toString());
    man.arriveAtStop(4);
}

console.log(man.toString());

// Should throw an Error (minutes cannot be negative)
// man.arriveAtStop(-4);
// Should throw an Error (last stop reached)
// man.arriveAtStop(4);

// Should throw an Error at initialization
const wrong = new LineManager([
    { name: 'Stop', timeToNext: { wrong: 'Should be a number' } }
]);
