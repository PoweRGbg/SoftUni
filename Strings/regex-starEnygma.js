function solve(input) {
    let starPattern = /[STARstar]/g;
    let pattern = /@([A-z][a-z]+)[^@:!\->]*:(\d+)[^@:!\->]*!([AD])!.*->(\d+)/;
    let attackedPlanets = [];
    let destroyedPlanets = [];
    let numberOfMessages = Number(input.shift());
    for (let index = 0; index < numberOfMessages; index++) {
        const message = input.shift();
        let char = starPattern.exec(message);
        let numberOfChars = 0;
        while (char != undefined) {
            numberOfChars++;
            char = starPattern.exec(message);
        }


        let decrypted = "";
        for (let index = 0; index < message.length; index++) {
            let newCode = message.charCodeAt(index) - numberOfChars;
            // console.log(`old ${message[index]}(${message.charCodeAt(index)})(${numberOfChars}) -> new ${String.fromCharCode(newCode)}`);
            decrypted += String.fromCharCode(newCode);
        }


        let result = decrypted.match(pattern);
        if (result != null) {
            if (result[3] == "A") {
                attackedPlanets.push(result[1]);
            } else if (result[3] == "D") {
                destroyedPlanets.push(result[1]);
            }
        }
    }
    attackedPlanets.sort((a, b) => a.localeCompare(b));
    destroyedPlanets.sort((a, b) => a.localeCompare(b));
    console.log(`Attacked planets: ${attackedPlanets.length}`);
    attackedPlanets.forEach(planet => {
        console.log(`-> ${planet}`);

    });
    console.log(`Destroyed planets: ${destroyedPlanets.length}`);
    destroyedPlanets.forEach(planet => {
        console.log(`-> ${planet}`);

    });

}
// solve([ '2', 'STCDoghudd4=63333$D$0A53333', 'EHfsytsnhf?8555&I&2C9555SR' ]
// );
solve([
    '3',
    "tt(''DGsvywgerx>6444444444%H%1B9444",
    'GQhrr|A977777(H(TTTT',
    'EHfsytsnhf?8555&I&2C9555SR'
]);