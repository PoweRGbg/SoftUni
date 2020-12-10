function solve(input) {
    let line = input.shift().split(", ");
    let healthPattern = /[^\d+-\/.*]/g;
    let damagePattern = /([+*\-*[0-9]*\.*[0-9]+)/g;
    let multiplyPattern = /(\*+)/g;
    let dividePattern = /(\/+)/g;
    let daemons = {};
    line.forEach(element => {
        // sum of the asci codes of all characters (excluding numbers (0-9), arithmetic symbols ('+', '-', '*', '/') and delimiter dot ('.')) 
        // gives a demon's total health
        let healthText = element.trim();
        let damageText = element.trim();
        let char = healthPattern.exec(healthText);
        let health = 0;
        let damage = 0;
        while (char != undefined) {
            health += char[0].charCodeAt(0);
            char = healthPattern.exec(healthText);

        }
        char = damagePattern.exec(damageText);



        while (char != undefined) {
            damage += Number(char[0]);
            char = damagePattern.exec(damageText);

        }

        for (let index = 0; index < damageText.length; index++) {
            const element = damageText[index];
            if(element == "/"){
                damage /= 2;
            } else if(element == "*"){
                damage *= 2;
            }
            
        }

        daemons[damageText] = health + " " + damage;
    });

    // sorted alphabetically.
    let sorted = Object.entries(daemons)
                    .sort(compare);

    for (const daemon of sorted) {
        let [health, damage] = daemon[1].split(" ");
        console.log(`${daemon[0]} - ${health} health, ${Number(damage).toFixed(2)} damage`);
    }
    function compare(a, b) {
        let heroA = a[1];
        let heroB = b[1];
        if (a[0].localeCompare(b[0]) != b[0].localeCompare(a[0])) {
            return a[0].localeCompare(b[0]);
        } else {
            return a[0].localeCompare(b[0]);
        }

    }

}

solve(['M3ph-0.5s-0.5t0.0**']
);
solve(['M3ph1st0**, Azazel']
);
solve(['Gos/ho']);