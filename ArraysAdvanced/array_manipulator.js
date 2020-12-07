function solve(input, input1) {
    let arrayOfNumbers = input;
    let commands = input1;

    commands.forEach(element => {
        if (element === `print`) {
            console.log(`[ ${arrayOfNumbers.join(", ")} ]`);
            return;
        } else {
            var temp = element.split(" ");
            if (temp[0] == "add") {
                // arrayOfNumbers = add(temp[2], parseInt(temp[1]), arrayOfNumbers);
                arrayOfNumbers.splice(Number(temp[1]), 0, Number(temp[2]));
            } else if (temp[0] == "addMany") {
                let pos = parseInt(temp[1]);
                let arrayToAdd = [];
                for (let index = 2; index < temp.length; index++) {
                    arrayToAdd.push(Number(temp[index]));
                }
                arrayToAdd = temp.splice(2, temp.length - 2);
                // console.log(`at pos ${pos} adding ${howMany} positions and they are ${arrayToAdd}`);
                arrayOfNumbers = addMany(arrayOfNumbers, pos, arrayToAdd);
            } else if (temp[0] == "contains") {
                console.log(contains(arrayOfNumbers, parseInt(temp[1])));
            } else if (temp[0] == "remove") {
                arrayOfNumbers.splice(parseInt(temp[1]), 1);
            } else if (temp[0] == "shift") {
                arrayOfNumbers = shift(arrayOfNumbers, parseInt(temp[1]));
            } else if (temp[0] == "sumPairs") {
                arrayOfNumbers = sumPairs(arrayOfNumbers);
            } 
        }
    });

    function add(number, position, array) {
        let newArray = [];
        let newLength = array.length + 1;
        for (let index = 0; index < newLength; index++) {
            const element = array[index];
            if (parseInt(position) === index) {
                newArray.push(parseInt(number));
            } else {
                newArray.push(array.shift());
            }
        }

        return newArray;
    }

    function addMany(array, position, arrayOfElements) {
        // addMany <index><element 1> <element 2> … <element n> – adds a set of elements at the specified index.
        for (let index = 0; index < arrayOfElements.length; index++) {
            array.splice(position + index, 0, Number(arrayOfElements[index]));
        }
        return array;
    }

    function contains(array, number) {
        // contains <element> – prints the index of the first occurrence of the specified element (if exists) in the array 
        // or -1 if the element is not found.
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (parseInt(element) === parseInt(number)) {
                return index;
            }
        }
        return -1;
    }

    function sumPairs(array) {
        // sums the elements in the array by pairs (first + second, third + fourth, …).
        let sum = [];
        for (let index = 0; index < array.length; index += 2) {
            const element = parseInt(array[index]);
            if (index + 1 >= array.length) {
                sum.push(element);
                return sum;
            }
            sum.push(element + parseInt(array[index + 1]));
        }
        return sum;
    }

    function shift(array, positions) {
        //shift <positions> – shifts every element of the array the number of positions to the left (with rotation).
        // oFor example, [1, 2, 3, 4, 5] -> shift 2 -> [3, 4, 5, 1, 2]
        for (let index = 0; index < positions; index++) {
            const element = array.shift();
            array.push(element);
        }
        return array;
    }
}

solve([1, 2, 3, 4, 5],
    ['shift 12', 'print']);