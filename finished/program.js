function dom1(input) 
{   
    let size = input.shift();
    let increment = input.shift();
    let stone = 0;
    let marble = 0;
    let lapis = 0;
    let gold = 0;
    let level = 1;
    let side = size - 2*increment;

    while ((size - 2*increment) > 0){
        let stoneNeeded = side*(size-2*increment);
        stone += stoneNeeded;
        if (level % 5 == 0){
            lapis += size*size - stoneNeeded;
        } else {
            marble += size*size - stoneNeeded;
        }
        console.log("Level: "+level + " Size: "+size+" Stone needed: "+stoneNeeded+" Stone total: "+stone+" Marble: "+marble+" Lapis: "+lapis);
        level++;
        size = size - 2*increment;
        side = side - Math.floor(2*increment);
    }
    gold = size * size;
    console.log("Level: "+level + " Size: "+size+" Stone total: "+stone+" Marble: "+level+" Lapis: "+level+" Gold: "+gold);
    console.log("Stone required: "+Math.ceil(stone));
    console.log("Marble required: "+Math.ceil(marble));
    console.log("Lapis Lazuli required: "+Math.ceil(lapis));
    console.log("Gold required: "+Math.ceil(gold));
    console.log("Final pyramid height: "+Math.ceil(level*increment));



}

dom1([11,0.75]);
