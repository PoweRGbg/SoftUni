function solve(input1, input2){
    let side = Number(input1);
    let step = Number(input2);
    let stone = 0;
    let marble = 0;
    let lapis = 0;
    let gold = 0;
    let level = 0;

    while(side > 0){
        level++;

        if(side<3) {
            gold = Math.pow(side,2);
        } else {
            
            stone += (side-2) * (side-2);

            if(level % 5 == 0){
                lapis += (4*side-4);
            } else {
                marble += (4*side-4);
            }
            // console.log("Level: "+level+" Side is: "+side+" Stone: "+stone+"()"+" Marble: "+marble+"("+(4*side-4)*step+")"+" Lapis: "+lapis+"("+(4*side-4)*step+")");
        }    
        side = side - 2;

    }

    console.log("Stone required: "+Math.ceil(stone*step));
    console.log("Marble required: "+Math.ceil(marble*step));
    console.log("Lapis Lazuli required: "+Math.ceil(lapis*step));
    console.log("Gold required: "+Math.ceil(gold*step));
    console.log("Final pyramid height: "+Math.floor(level*step));
    
}

solve(23, 0.5);