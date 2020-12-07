function ladybugs(input1){
    let field = [];
    let fieldSize = Number(input1.shift());    

    // initialize field
    for(let index = 0; index < fieldSize; index++){
        field[index] = 0;
    }
    // adding bugs    
    let bugs = input1.shift().toString().split(" ");
    for (let index = 0; index < fieldSize; index++) {
        const element = bugs;
        if(index == Number(bugs[0])){
            bugs.shift();
            field[index] = 1;
        }        
    }

    // console.log(`Field size is ${field.length} - ${field.join(" ")}`);
    let command = input1.shift();
    while(command != undefined){
        var position = Number(command.split(" ")[0]);
        var direction = command.split(" ")[1];
        var distance = Number(command.split(" ")[2]);
        // is there a bug on that pos
        if(field[position] == 1) {
            //free position
            field[position] = 0;
            // check left direction
            if (direction == "left"){
                distance = distance * -1;
            }

            var isClear = false;
            while(!isClear){
                position += distance;
                // console.log(`checking position ${landingPosition}`);
                if(field[position] == 0){
                    isClear = true;
                    field[position] = 1;
                } else if(position > fieldSize -1 || position < 0){
                    isClear = true;
                } 

            }

        }

        command = input1.shift();
    }
    
    console.log(field.join(" "));
}

ladybugs([ 3, '0 1 2',
'0 right 1',
'1 right 1',
'2 right 1']);