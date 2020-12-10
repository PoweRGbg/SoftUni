function solve(input){
    let n = Number(input.shift());
    let wordPattern = /(@#+)([A-Z][A-Za-z\d]{4,}[A-Z])(@#+)/;
    let results = [];
    for (let index = 0; index < n; index++) {
        const current = input[index];
        let result = wordPattern.exec(current);
        if(result != null){
            results.push(result[2]);
            let groupPattern = /\d/g;
            let groupDigits = result[2].match(groupPattern);
            let group = "00";
            if(groupDigits != null){
                group = "";
                groupDigits.forEach(char => {
                    group += char;
                });
            }
            console.log(`Product group: ${group}`);
            
        } else {
            console.log("Invalid barcode");
            
        }
    }

}
solve([ '3', '@#FreshFisH@#', '@###Brea0D@###', '@##Che46sE@##' ]);
console.log(" ---- ");
solve([ '6',    '@###Val1d1teM@###',    '@#ValidIteM@#',    '##InvaliDiteM##',    '@InvalidIteM@',    '@#Invalid_IteM@#',    '@#ValiditeM@#'  ] );
