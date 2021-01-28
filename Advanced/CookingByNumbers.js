function cookingByNumbers(input, ...operations){
    let result = Number(input);
    operations.forEach(command => {
        if(command == 'chop'){
            result = result / 2;
            console.log(result);
        } else if(command == 'dice'){
            result = Math.sqrt(result);
            console.log(result);
        } else if(command == 'spice'){
            result += 1;
            console.log(result);
        } else if(command == 'bake'){
            result *= 3;
            console.log(result);
        } else if(command == 'fillet'){
            result *= 0.8;
            console.log(result.toFixed(1));
        } 
    });

}
cookingByNumbers('32', 'chop', 'chop', 'chop', 'chop', 'chop');
cookingByNumbers('9', 'dice', 'spice', 'chop', 'bake', 'fillet');