function solve(input1){
    let number = Number(input1);
    let divisors = getDivisors(number);

    if(number == sumArray(divisors)){
        console.log(`We have a perfect number!`);
    } else {
        console.log(`It's not so perfect.`);
    }

    function sumArray(input){
        let sum = 0;
        for (let index = 0; index < input.length; index++) {
            const element = input[index];
            sum +=element;
        }  
        // console.log(`sum of array is ${sum}`);
        return sum;
    }

    function getDivisors(input){
        let divisors = [];
        for (let index = 0; index <= input / 2; index++) {
            if (input % index == 0){
                // console.log(`${index} is divisor of ${input}`);
                divisors.push(index);
            }            
        }
        return divisors;
    }
}
solve(6)