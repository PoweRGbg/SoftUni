function solve(input) {
    let wall = input;
    // array of strings which shoud be parsed as numbers
    // construction crew that can add 1 foot of height per day by using 195 cubic yards of concrete
    const concretePerStep = 195;
    const priceOfConcrete = 1900;
    const something = " pesos";
    // meaning all sections that aren't completed (are less than 30 feet high) grow by 1 foot every day. 
    // At the end, print on a single line, separated by comma and space, the amount of concrete used each day, 
    // and on a second line, the final cost of the wall.
    let totalConcrete = 0;
    let concreteToday = today();
    let daylyConcreteValues = [];
    while(concreteToday > 0){
        daylyConcreteValues.push(concreteToday);
        totalConcrete += concreteToday;
        concreteToday = today();
    }

    console.log(daylyConcreteValues.join(", "));
    console.log(totalConcrete*priceOfConcrete + something);

    function today(){
        let totalConcreteToday = 0;
        for (let index = 0; index < wall.length; index++) {
            const element = wall[index];
            if(element < 30){
                // add concrete to todays sum
                totalConcreteToday += concretePerStep;
                wall[index]++; // increase height by 1
            }
        }
        return totalConcreteToday;
    }
}

solve([17, 22, 17, 19, 17]);