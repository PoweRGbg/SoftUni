function factory(order) {
    let car = {};
    const engines = {
        'Small engine': { power: 90, volume: 1800 },
        'Normal engine': { power: 120, volume: 2400 },
        'Monster engine': { power: 200, volume: 3500 }
    };
    car.model = order.model;
    //engine    
    const engineKeys = Object.keys(engines);
    for (let index = 0; index < engineKeys.length; index++) {
        if(order.power <= engines[engineKeys[index]].power && !car.hasOwnProperty('engine')){
            car.engine = engines[engineKeys[index]];
        } 
    }
    car.carriage = {
        type: order.carriage,
        color: order.color
    };
    // wheelsize must be odd
    if(order.wheelsize % 2 == 0){
        order.wheelsize -= 1; 
    }
    car.wheels = [order.wheelsize, order.wheelsize, order.wheelsize, order.wheelsize];

    return car;
}

console.log(factory({ model: 'Opel Vectra',
power: 110,
color: 'grey',
carriage: 'coupe',
wheelsize: 17 }));