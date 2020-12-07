function solve(input) {
    //matrix of integers, 
    // each integer separated by a single space, and each row on a new line, 
    // which will represent the current situation in the hangar.

    //  Then on the last line of input you will receive indexes - coordinates to several cells 
    // in the hangar separated by a single space, 
    // in the following format: row1,column1  row2,column2  row3,column3… 
    let field = [];
    let commands = input;
    let bombs = [];
    let damage = 0;
    let kills = 0;

    for (let index = 0; index < commands.length; index++) {
        const element = commands[index];
        if (index != commands.length - 1) {
            field.push(element.split(" ").map(Number));
        } else {
            bombs = element.split(" ");
        }
    }
    const fieldSize = field.length;
    printField();
    // console.log(arrays.join(" "));
    //detonate all the bombs in the order they are given
    bombs.forEach(bomb => {
        let pos = getBomb(bomb.toString());
        let x = Number(pos[0]);
        let y = Number(pos[1]);
        // console.log(`bomb at pos ${x}, ${y}`);
        if (field[x][y] > 0) { // detonate only if there is abunny there
            detonate(x, y);
        }

        printField();
    });

    // roceed to kill any other convict bunny which has remained alive. 
    // You must count all the damage Snowball did in the hangar. 
    // Note that bomb explosion damage does not count as Snowballs damage, 
    // but the killing of bomb bunnies and other bunnies DOES. 
    // Snowball’s damage for every bunny is equal to the bunny at that cell’s integer value.
    killEmAll();
    console.log(`${damage}`);
    console.log(`${kills}`);

    function killEmAll() {
        // go throu the array (field) and if a cell is not zero
        // add the integer value to damage, increase kills
        // null it
        field.forEach(element => {
            element.forEach(cell => {
                if (cell > 0) {
                    damage += cell;
                    kills += 1;
                    cell = 0;
                }
            });
        });
    }

    function detonate(line, column) {
        //locate the bunny to get the power
        let power = Number(field[line][column]);
        if (power < 1) { // No bunny here
            return;
        }
        // Note that bomb explosion damage does not count as Snowballs damage, 
        // but the killing of bomb bunnies and other bunnies DOES.
        damage += power;
        kills++;
        // bunny holding ball is killed
        field[line][column] = 0;
        // console.log(` damage of bomb is ${power}`);
        // damage goes up,down,left,right and diagonals - 3*3 square around the bunny
        damagePos(line, column - 1, power); //left
        damagePos(line, column + 1, power); //right
        damagePos(line + 1, column - 1, power); //down-left
        damagePos(line + 1, column + 1, power); // down right
        damagePos(line + 1, column, power); //down
        damagePos(line - 1, column - 1, power); //up-left
        damagePos(line - 1, column + 1, power); //up-right
        damagePos(line - 1, column, power); //up
    }

    function damagePos(x, y, damage) {
        if (field[x] !== undefined) {
            if (field[x][y] !== undefined) {
                const before = field[x][y];
                field[x][y] = Math.max(0, field[x][y] - damage);
                // console.log(`(${x},${y})=> ${before} - ${damage} = ${field[x][y]}`);
            }
        }
    }

    function getBomb(someString) {
        let bomb = [];
        bomb = someString.split(",");
        return bomb;
    }

    function printField() {
        field.forEach(element => {
            // console.log(element);
        });
    }
}

solve(['5 10 15 20',
'10 10 10 10',
'10 15 10 10',
'10 10 10 10',
'2,2 0,1 3,0 0,3']);