function roadRadar(speed, where){
    let limit = 20;
    if (where == 'motorway'){
        limit = 130;
    } else if (where == 'interstate'){
        limit = 90;
    } else if (where == 'city'){
        limit = 50;
    } 
    if(speed <= limit){
        console.log(`Driving ${speed} km/h in a ${limit} zone`);
    } else {
        let status = 'speeding';
        let difference = speed-limit;
        if ( difference > 40){
            status = 'reckless driving';
        } else if (difference > 20){
            status = 'excessive speeding';
        }
        console.log(`The speed is ${difference} km/h faster than the allowed speed of ${limit} - ${status}`);
    }
}

roadRadar(40, 'city')
roadRadar(21, 'residential');
roadRadar(120, 'interstate');
roadRadar(200, 'motorway');