function solve(input, input2) {
    /*
    You will receive two arrays of integers. The second array is contains exactly three numbers. 
    First number represents the number of elements you have to take from the first array (starting from the first one).
    Second number represents the number of elements you have to delete from the numbers you took (starting from the first one). 
    Third number is the number we search in our collection after the manipulations. 

    */
    let sliceNumber = parseInt(input2[0]);
    let deleteNumber = parseInt(input2[1]);
    let lookFor = parseInt(input2[2]);

    let tempArr = [];
    // slice first
    for (let index = 0 + deleteNumber; index < sliceNumber; index++) {
        tempArr.push(parseInt(input[index]));
    }

    let occurances = 0;
    tempArr.forEach(element => {
        if (element == lookFor) {
            occurances++;
        }
    }
    );

    console.log(`Number ${lookFor} occurs ${occurances} times.`);
}

    function sumArray(arr) {
        var sum = 0;
        arr.forEach(element => {
            sum += Number(element);
        }
        );
        return sum;
    }
}


solve([5, 2, 3, 4, 1, 6],
    [5, 2, 3]);