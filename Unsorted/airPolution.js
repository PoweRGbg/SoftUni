function solve(input, input1) {
    let field = [];
    let temp = input;
    let commands = [];
    let result = [];
    temp.forEach(element => {
        field.push(element.split(" ").map(Number));
    });

    input1.forEach(element => {
        commands.push(element);
    });

    // process commands
    commands.forEach(element => {
        printField();
        command = element.split(" ");
        if (command[0] == "breeze") {
            let row = Number(command[1]);
            for (let index = 0; index < field[row].length; index++) {
                changeVal(row, index, -15);
            }
            printField();
        } else if (command[0] == "gale") {
            let col = Number(command[1]);
            for (let index = 0; index < field[col].length; index++) {
                changeVal(index, col, -20);
            }
            printField();
        } else if (command[0] == "smog") {
            let polute = Number(command[1]);
            for (let row = 0; row < field[0].length; row++) {
                for (let col = 0; col < field[0].length; col++) {
                    changeVal(row,col, polute);                    
                }
            }
            printField();
        }
    });

    //Find poluted areas >= 50
    result.push(poluted());

    //Print result
    if(result[0][0] !== undefined){
        let resultStr = "Polluted areas: "+result.join(", ");
        console.log(resultStr);
    } else {
        console.log("No polluted areas");
    }

    function poluted(){
        let res = [];
        for (let row = 0; row < field[0].length; row++) {
            for (let column = 0; column < field[0].length; column++) {
                const element = Number(field[row][column]);
                if ( element >= 50 ){
                    res.push("["+row+"-"+column+"]");
                }  
            }            
        }
        return res;
    }

    function changeVal(x, y, val) {
        // console.log(`(${x},${y}) => adding ${val}`);
        field[x][y] += val;
    }

    function printField() {
        field.forEach(element => {
            // console.log(element);
        });
    }
}
solve(["5 7 2 14 4",
"21 14 2 5 3",
"3 16 7 42 12",
"2 20 8 39 14",
"7 34 1 10 24"],
["breeze 1", "gale 2", "smog 35"]);