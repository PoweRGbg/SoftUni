function solve(input) {
    let sum = 0;

    let result = "Bought furniture:\n";
    for (let line of input) {
        let pattern = />>([A-Za-z]+)<<([\d]+(\.[\d]+)?)!([\d]+)/;
        let match = pattern.exec(line);
        if (match != null) {
            // console.log(match);
            result += match[1] + "\n";
            sum += Number(match[2])* Number(match[4]);
        }

    }
    result += `Total money spend: ${sum.toFixed(2)}`;
    console.log(result );
    
}

solve(['>>Sofa<<312.23!3', '>>TV<<300!5',
    '>Invalid<<!5',
    'Purchase']);