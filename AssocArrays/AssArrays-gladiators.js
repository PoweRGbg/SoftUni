function solve(input) {
    let gladiators = {};
    let element = input.shift();
    while (element != "Ave Cesar" && element != undefined) {
        let command = element.split(" ");
        if (command[1] == "vs") { // fight
            let gladiator1 = command[0];
            let gladiator2 = command[2];
            let common = false;
            if (Object.keys(gladiators).includes(gladiator1) && Object.keys(gladiators).includes(gladiator2) && gladiator1 != gladiator2) {
                let glad1Techmiques = Object.keys(gladiators[gladiator1]);
                glad1Techmiques.forEach(element => {
                    // compare wit every technique of the enemy
                    let enemy = Object.keys(gladiators[gladiator2]);
                    enemy.forEach(techn => {
                        if (techn == element && element != "suma")
                            common = true;
                    });

                    if (common) {
                        // fight is happening when we fond a common technique
                        //the gladiator with better total skill points wins and 
                        // the other is demoted from the tier -> remove him.
                        if (gladiators[gladiator1][`suma`] > gladiators[gladiator2][`suma`]) {
                            delete gladiators[gladiator2];
                        } else if (gladiators[gladiator1][`suma`] < gladiators[gladiator2][`suma`]){
                            delete gladiators[gladiator1];
                        }
                    }

                });
            }

        } else {
            // element is "{gladiator} -> {technique} -> {skill}"
            let [gladiator, technique, skill] = element.split(" -> ");
            skill = Math.min(1000, Number(skill));
            skill = Math.max(0, Number(skill));
            if (!gladiators.hasOwnProperty(gladiator)) {
                gladiators[gladiator] = {
                    [technique]: skill,
                    [`suma`]: Number(skill)
                }
            } else if (!gladiators[gladiator].hasOwnProperty(technique)) {
                gladiators[gladiator][technique] = skill;
                gladiators[gladiator][`suma`] += Number(skill);
            } else if(gladiators[gladiator][technique] < skill){
                gladiators[gladiator][`suma`] -= gladiators[gladiator][technique];
                gladiators[gladiator][technique] = Number(skill);
                gladiators[gladiator][`suma`] += Number(skill);

            }
        }
        element = input.shift();
    }

    let arena = Object.keys(gladiators);
    arena.sort((totalA, totalB) => {
        if (gladiators[totalB][`suma`] == gladiators[totalA][`suma`])
            return totalA.localeCompare(totalB);
        return gladiators[totalB][`suma`] - gladiators[totalA][`suma`];
    });
    arena.forEach(gladiator => {
        totalSkill(gladiator);
    });

    function totalSkill(gladiator) {
        let skillNames = Object.keys(gladiators[gladiator]);
        skillNames.sort((skillA, skillB) => {
            if (gladiators[gladiator][skillA] == gladiators[gladiator][skillB]) {
                return skillA.localeCompare(skillB);
            } else {
                return gladiators[gladiator][skillB] - gladiators[gladiator][skillA];
            }
        });
        console.log(`${gladiator}: ${gladiators[gladiator][`suma`]} skill`);
        skillNames.forEach(name => {
            if (name != "suma")
                console.log(`- ${name} <!> ${gladiators[gladiator][name]}`);

        });
    }
    

}


solve([
    'Pesho -> Duck -> 700',
    'Pesho -> Duck -> 500',
    'Julius -> Shield -> 150',
    'Gladius -> Heal -> 200',
    'Gladius -> Support -> 250',
    'Gladius -> Shield -> 250',
    'Pesho vs Gladius',
    'Gladius vs Julius',
    'Gladius vs Gosho',
    'Pesho vs Pesho',

    'Ave Cesar'
]
);