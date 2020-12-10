function solve(input) {
    // parse input
    let regexWin = /([$#@^])\1{5,9}/g;
    input = input.shift().split(", ");
    for (let ticket of input) {
        ticket = ticket.trim();
        if (ticket.length == 20) {
            let leftHalf = ticket.substr(0, ticket.length / 2);
            let rightHalf = ticket.substr(ticket.length / 2);
            let rightMatch = rightHalf.match(regexWin);
            let leftMatch = leftHalf.match(regexWin);
            // console.log(`${leftHalf} - ${leftMatch} -> ${rightHalf} - ${rightMatch}`);
            if(leftMatch != null && rightMatch != null && leftMatch[0][0] === rightMatch[0][0]){
                //win
                if(leftMatch[0].length == 10 && rightMatch[0].length == 10){
                    // jackpot
                    console.log(`ticket "${ticket}" - ${leftMatch[0].length}${leftMatch[0][0]} Jackpot!`);
                    
                } else {
                    console.log(`ticket "${ticket}" - ${Math.min(leftMatch[0].length, rightMatch[0].length)}${leftMatch[0][0]}`);
                    
                }
            } else {
                console.log(`ticket "${ticket}" - no match`);
                
            }

        } else {
            console.log("invalid ticket");
            
        }

    }
}


solve(['Cash^^^^^^Ca^^^^^^^h']
);
solve(['$$$$$$$$$$@$$$$$$$$$   ,   aabb  ,     th@@@@@@eemo$$$$$$ey']);
// solve(['validticketnomatch:(']);