function solve(input){
    let gold = input.shift();
    let firstDay = 0;
    let wallet = 0;
    let bitCoins = 0;
    let day = 1;

    while(gold != null){
        if(day % 3 == 0)
            gold = gold*0.7;
        wallet += gold * 67.51;
        if(wallet > 11949.16){
            if(firstDay == 0)
                firstDay = day;
            bitCoins += Math.floor(wallet / 11949.16);
            wallet = wallet % 11949.16;
        }
        day++;
        gold = input.shift();
    }

    console.log("Bought bitcoins: "+bitCoins);
    if (firstDay > 0)
        console.log("Day of the first purchased bitcoin: "+firstDay);
    console.log("Left money: "+wallet.toFixed(2)+" lv.")

}

solve([3124.15, 504.212, 2511.124]);