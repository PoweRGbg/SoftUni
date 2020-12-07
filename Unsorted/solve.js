function solve(input) {
    let cars = {};
    let actions = {
        Refuel(cars, name, howMuch) {
            cars[name].fuel += Number(howMuch);
            if (cars[name].fuel > 75) {
                howMuch -= cars[name].fuel - 75;
                cars[name].fuel = 75;
            }
            console.log(`${name} refueled with ${howMuch} liters`);

        },
        Revert(cars, name, howMuch) {
            cars[name].mileage -= Number(howMuch);
            if (cars[name].mileage < 10000) {
                cars[name].mileage = 10000;
            } else {
                console.log(`${name} mileage decreased by ${howMuch} kilometers`);
            }

        },
        Drive(cars, name, distance, fuel) {
            if (cars[name].fuel < Number(fuel)) {
                console.log("Not enough fuel to make that ride");
            } else {
                cars[name].mileage += Number(distance);
                cars[name].fuel -= Number(fuel);
                console.log(`${name} driven for ${distance} kilometers. ${fuel} liters of fuel consumed.`);
                if (cars[name].mileage > 100000) {
                    console.log(`Time to sell the ${name}!`);
                    delete cars[name];
                }
            }
        }

    }

    let numberOfcars = Number(input.shift());
    for (let index = 0; index < numberOfcars; index++) {
        let [car, mileage, fuel] = input.shift().split("|");
        cars[car] = {
            mileage: Math.max(Number(mileage), 0),
            fuel: Math.min(Number(fuel), 75)
        }

    }
    // console.log(cars);
    let line;
    while ((line = input.shift()) != "Stop") {
        let [command, carName, ...params] = line.split(" : ");
        actions[command](cars, carName, ...params);
    }

    let sorted = Object.entries(cars);
    sorted.sort(comileageare);
    sorted.forEach(car => {
        console.log(car[0] + " -> Mileage: "+car[1].mileage+" kms, Fuel in the tank: "+car[1].fuel+" lt.");
    });

    function comileageare(a, b){
        return b[1].mileage - a[1].mileage || a[0].localeCompare(b[0]);
    }

}
solve([
    '3',
    'Audi A6|38000|62',
    'Mercedes CLS|11000|35',
    'Volkswagen Passat CC|45678|5',
    'Drive : Audi A6 : 543 : 47',
    'Drive : Mercedes CLS : 94 : 11',
    'Drive : Volkswagen Passat CC : 69 : 8',
    'Refuel : Audi A6 : 50',
    'Revert : Mercedes CLS : 500',
    'Revert : Audi A6 : 30000',
    'Stop'
]);
console.log("------");
solve([
    '4',
    'Lamborghini Veneno|11111|74',
    'Bugatti Veyron|12345|67',
    'Koenigsegg CCXR|67890|12',
    'Aston Martin Valkryie|99900|50',
    'Drive : Koenigsegg CCXR : 382 : 82',
    'Drive : Aston Martin Valkryie : 99 : 23',
    'Drive : Aston Martin Valkryie : 2 : 1',
    'Refuel : Lamborghini Veneno : 40',
    'Revert : Bugatti Veyron : 2000',
    'Stop'
]);