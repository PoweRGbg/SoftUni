function solve(input, input2) {
    let bomb = parseInt(input2[0]);
    let bombPower = parseInt(input2[1]);
    for (let index = 0; index < input.length; index++) {
        const element = parseInt(input[index]);
        if (element == bomb) {
            // we detonate a bomb
            let start = index - bombPower;
            let end = bombPower * 2 +1;
            if (start < 0)
                start = 0;
            if (end >= input.length){
                end = input.length;
            }
            //we should remove positions from (index - bombPower ) to (index + bombpower)
            // console.log(`detonating at pos ${index} power is ${bombPower}`);
            input.splice(start, end);
            // console.log(`input is ${input}`);
            index = 0;
        }
        
    }
    console.log(sumArray(input));
    // console.log(input.join(" "));

    function sumArray(arr){
        var sum = 0;
        arr.forEach(element => {
            sum += Number(element);    
        }
        );
        return sum;
    }
}


solve([1, 4, 4, 2, 8, 9, 1],
    [9, 3]);