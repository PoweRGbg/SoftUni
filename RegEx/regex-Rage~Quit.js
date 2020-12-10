function solve(input) {
    // parse input
    let line = input.shift();
    let unique = [];
    let pattern  = /([\D]+)([0-9]+)/g;
    let output = "";
    let result = pattern.exec(line);
        while (result != null) {
            // console.log(`string ${result[1]} times ${result[2]}`);
            for (let index = 0; index < result[1].length; index++) {
                const element = result[1][index];
                if(result[2] != "0")
                isUnique(element.toUpperCase());
            }
            for (let index = 0; index < result[2]; index++) {
                output += result[1].toUpperCase();                
            }
            result = pattern.exec(line);
        }

    function isUnique(char){
        if(!unique.includes(char)){
            unique.push(char);
        }
    }
    console.log(`Unique symbols used: ${unique.length}`);
    console.log(output);
    
    
}
// solve([ 'a3' ]);
// solve([ 'aSd2&5s@1' ]);
solve(['e-!btI17z=E:DMJ19U1Tvg VQ>11P"qCmo.-0YHYu~o%/%b.}a[=d15fz^"{0^/pg.Ft{W12`aD<l&$W&)*yF1WLV9_GmTf(d0($!$`e/{D\'xi]-~17 *%p"%|N>zq@ %xBD18<Y(fHh`@gu#Z#p"Z<v13fI]\':\\Iz.17*W:\\mwV`z-15g@hUYE{_$~}+X%*nytkW15']);