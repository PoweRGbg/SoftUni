function solve(input1){
    let complete = Number(input1);
    let bar = constructBar(complete);
    if(complete == 100){
        console.log(`${percent(complete)} Complete!`);
        console.log(`${bar}`)
    } else {
        console.log(`${percent(complete)} ${bar}`);
        console.log(`Still loading...`);
    }

    function percent(input){
        return `${input}%`;
    }

    function constructBar(input){
        let percent = Number(input);
        let bar = "[";
        bar = bar + getString(percent, "%") + getString(100-percent, ".") + "]";
        return bar;
    }

    function getString(input, symbol){
        let string = "";

        while(string.length +1  <= input/10){
            string = string + symbol;
        }
        console.log(`${string.length}`);
        return string;
    }

}
solve(100)