function solve(input) {
    let text = input;
    // console.log(input);
    let wordPattern = /([\|\#])([A-Za-z\s]*)\1([0-3][0-9]\/[0-1][0-9]\/\d{2})\1([1-9]\d{0,3})\1/g;
    let results = {};
    let totalCalories = 0;
    let result = wordPattern.exec(text);
    while (result != null) {
        results[result[2]] = {
            expiration: result[3],
            cals: result[4]
        }
        totalCalories += Number(result[4]);
        result = wordPattern.exec(text);
    }
    console.log(`You have food to last you for: ${Math.floor(totalCalories / 2000)} days!`);
    let entries = Object.entries(results);
    if (entries.length > 0) {
        entries.forEach(food => {
            console.log(`Item: ${food[0]}, Best before: ${food[1]['expiration']}, Nutrition: ${food[1]["cals"]}`);

        });
    }

}
solve(['#Bread#19/03/21#4000#|Invalid|03/03.20||Apples|08/10/20|200||Carrots|06/08/20|500||Not right|6.8.20|5|']);
console.log(" ---- ");
solve([
    '$$#@@%^&#Fish#24/12/20#8500#|#Incorrect#19.03.20#450|$5*(@!#Ice Cream#03/10/21#9000#^#@aswe|Milk|05/09/20|2000|'
]);
console.log(" ---- ");
solve([`Hello|#Invalid food#19/03/20#450|$5*(@`]);