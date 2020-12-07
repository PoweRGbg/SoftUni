function solve(input) {
    let arrays = [];
    let commands = input;
    let neighbours = 0;
    commands.forEach(element => {
        arrays.push(element);
    });
    arrays.sort((a,b) => b.length - a.length);

    for (let index = 0; index < arrays.length-1; index++) {
        const currentArray = arrays[index];
        currentArray.forEach(element => {
            let currIndex = currentArray.indexOf(element);
            if(element === arrays[index+1][currIndex]){
                neighbours++;
            }
            if(element === currentArray[currIndex+1]){
                neighbours++;
            }
        });
        
    }
    console.log(neighbours);
    // console.log(arrays.join(" "));
}

solve([[2, 2, 5, 7, 4],
    [4, 0, 5, 3, 4],
    [2, 5, 5, 4, 2]]);