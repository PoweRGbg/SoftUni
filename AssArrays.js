function solve(input) {
    //read number of heroes
    let n = input.shift();
    let heroes = {};
    let actions = {
        CastSpell: (heroes, [name, mpCost, spellName]) => {
            let hero = heroes[name];
            mpCost = Number(mpCost);
            if (hero.mp >= mpCost) {
                hero.mp -= mpCost;
                console.log(`${name} has successfully cast ${spellName} and now has ${hero.mp} MP!`);
            }
        },
        TakeDamage: (heroes, [name, damage, source]) => {
            let hero = heroes[name];
            hero.hp -= Number(damage);
            if (hero.hp > 0) {
                console.log(`${name} was hit for ${damage} HP by ${source} and now has ${hero.hp} HP left!`);
            } else {
                console.log(`${name} has been killed by ${source}!`);
                
            }
        },
        Recharge: (heroes, [name, howMuch]) => {
            let hero = heroes[name];
            howMuch = Number(howMuch);
            if(hero.mp + howMuch > 200){
                howMuch = 200 - hero.mp;
            }
            hero.mp += Math.min(Number(howMuch), 200);
            console.log(`${name} recharged for ${howMuch} MP!`);

        },
        Heal: (heroes, [name, howMuch]) => {
            let hero = heroes[name];
            howMuch = Number(howMuch);
            if(hero.hp + howMuch > 100){
                howMuch = 100 - hero.hp;
            }
            hero.hp += Math.min(Number(howMuch), 100);
            console.log(`${name} healed for ${howMuch} HP!`);

        }
    };

    // parse each hero
    for (let index = 0; index < n; index++) {
        const element = input.shift();
        let [name, hp, mp] = element.split(" ");
        heroes[name] = {
            hp: Number(hp),
            mp: Number(mp)
        }

    }

    // parse and execute line until end
    let line = input.shift();
    while (line != "End") {
        let [command, ...args] = line.split(" - ");
        actions[command](heroes, args);

        line = input.shift();
    }




    // sort heroes
    let sorted = Object.entries(heroes)
                        .filter(([name, {hp, mp}]) => hp > 0)
                        .sort(compare);
    function compare(a, b){
        let heroA = a[1];
        let heroB = b[1];
        if(heroB.hp != heroA.hp){
            return heroB.hp - heroA.hp;
        } else {
            return a[0].localeCompare(b[0]);
        }

    }
    // print
    
    for (const hero of sorted) {
        console.log(hero[0]);
        console.log(`  HP: ${hero[1].hp}`);
        console.log(`  MP: ${hero[1].mp}`);
    }

}

// solve(['2',
//     'Solmyr 85 120',
//     'Kyrre 99 50',
//     'Heal - Solmyr - 10',
//     'Recharge - Solmyr - 50',
//     'TakeDamage - Kyrre - 66 - Orc',
//     'CastSpell - Kyrre - 15 - ViewEarth',
//     'End']);
solve(['4',
    'Adela 90 150',
    'SirMullich 70 40',
    'Ivor 1 111',
    'Tyris 94 61',
    'Heal - SirMullich - 50',
    'Recharge - Adela - 100',
    'CastSpell - Tyris - 1000 - Fireball',
    'TakeDamage - Tyris - 99 - Fireball',
    'TakeDamage - Ivor - 3 - Mosquito',
    'End']);