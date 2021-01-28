function solve( fruit, weight, perKilogram){
    let kilo  = (weight / 1000).toFixed(2);
    let money = ((perKilogram * weight) / 1000).toFixed(2);
    console.log(`I need $${money} to buy ${kilo} kilograms ${fruit}.`);
}

solve('orange', 2500, 1.80);