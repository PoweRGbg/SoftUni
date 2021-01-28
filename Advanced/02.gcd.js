function solve( param1, param2){
    let gcd = 1;
    for (let index = 1; index <= param1; index++) {
        if(param1 % index == 0 && param2 % index == 0){
            gcd = index;
        }
    }
    console.log(gcd);
}

solve(9, 15);