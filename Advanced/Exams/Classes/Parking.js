class Parking{
    constructor(capacity){
        this.capacity = capacity;
        this.vehicles = {};
    }

    addCar(carModel, carNumber){
        if(Object.keys(this.vehicles).length >= this.capacity){
            throw new Error('Not enough parking space.');
        } else {
            let car = {
                'carModel': carModel,
                'carNumber': carNumber,
                payed: false,
            };
            this.vehicles[carNumber] = car;
            return `The ${car.carModel}, with a registration number ${car.carNumber}, parked.`;
        }
    }

    removeCar(carNumber){
        if(this.vehicles.hasOwnProperty(carNumber)){
            if(this.vehicles[carNumber].payed == false){
                throw new Error(`${carNumber} needs to pay before leaving the parking lot.`)
            } else {
                // leave 
                delete this.vehicles[carNumber];
                return `${carNumber} left the parking lot.`;
            }

        } else {
            throw new Error("The car, you're looking for, is not found.");
        }
    } 

    pay(carNumber){
        if(this.vehicles.hasOwnProperty(carNumber)){
            if(this.vehicles[carNumber].payed == true){
                throw new Error(`${carNumber}'s driver has already payed his ticket.`)
            } else {
                this.vehicles[carNumber].payed = true;
                return `${carNumber}'s driver successfully payed for his stay.`;
            }

        } else {
            throw new Error(`${carNumber} is not in the parking lot.`);
        }
    }

    getStatistics(carNumber){
        if(carNumber == undefined){
            let result = `The Parking Lot has ${this.capacity - Object.keys(this.vehicles).length} empty spots left.`;
            let sortedArr = [];
            for (const car in this.vehicles) {
                sortedArr.push([car, this.vehicles[car]]); 
            }
            sortedArr.sort((a,b) => a[1]['carModel'].localeCompare(b[1]['carModel']));
            for (let index = 0; index < sortedArr.length; index++) {
                const element = this.vehicles[sortedArr[index][0]];
                result += `\n${element.carModel} == ${element.carNumber} - ${element.payed?'Has payed':'Not payed'}`;                
            }
            return result;
        } else {
            return `${this.vehicles[carNumber].carModel} == ${carNumber} - ${this.vehicles[carNumber].payed?'Has payed':'Not payed'}`;
        }
    }
    e(message) {
        throw new Error(message);
    }

}

const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.getStatistics());

console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));