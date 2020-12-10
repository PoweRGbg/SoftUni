function solve(input){
    let pattern = /\%{1}([A-Z][a-z]+)\%.*\<([\w]+)\>.*\|([\d]+)\|[^\d]*([\d.]*)\$/;
    let totalIncome = 0;
    let line = input.shift();
    while (line != "end of shift") {
        let result = line.match(pattern);

        if(result != null){
            console.log(`${result[1]}: ${result[2]} - ${(result[3]*result[4]).toFixed(2)}`);
            totalIncome += result[3]*result[4];
        }
                
        line = input.shift();
    }

    console.log(`Total income: ${totalIncome.toFixed(2)}`);
    
}


solve([
    '%InvalidName%<Croissant>|2|10.3$',
    '%Peter%<Gum>1.3$',
    '%Maria%<Cola>|1|2.4',
    '%Valid%<Valid>valid|10|valid20$',
    'end of shift'
  ]);