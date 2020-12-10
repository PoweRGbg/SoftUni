function solve(input) {
    let heroes = {};
    let actions = {
        Heal(heroes, name, howMuch) {
            heroes[name].HP += Number(howMuch);
            if (heroes[name].HP > 100) {
                howMuch -= heroes[name].HP - 100;
                heroes[name].HP = 100;
            }
            console.log(`${name} healed for ${howMuch} HP!`);

        },
        Recharge(heroes, name, howMuch) {
            heroes[name].MP += Number(howMuch);
            if (heroes[name].MP > 200) {
                howMuch -= heroes[name].MP - 200;
                heroes[name].MP = 200;
            }
            console.log(`${name} recharged for ${howMuch} MP!`);

        },
        TakeDamage(heroes, name, damage, attacker) {
            damage = Number(damage);
            if (heroes[name].HP > damage) {
                heroes[name].HP -= damage;
                console.log(`${name} was hit for ${damage} HP by ${attacker} and now has ${heroes[name].HP} HP left!`);
            } else {
                console.log(`${name} has been killed by ${attacker}!`);
                delete heroes[name];
            }

        },
        CastSpell(heroes, name, mana, spell) {
            mana = Number(mana);
            if (heroes[name].MP >= mana) {
                heroes[name].MP -= mana;
                console.log(`${name} has successfully cast ${spell} and now has ${heroes[name].MP} MP!`);
            } else {
                console.log(`${name} does not have enough MP to cast ${spell}!`);
            }

        }
    }

    let numberOfHeroes = Number(input.shift());
    for (let index = 0; index < numberOfHeroes; index++) {
        let [hero, health, mana] = input.shift().split(" ");
        heroes[hero] = {
            HP: Math.min(Number(health), 100),
            MP: Math.min(Number(mana), 200)
        }

    }
    let line;
    while ((line = input.shift()) != "End") {
        let [command, heroName, ...params] = line.split(" - ");
        actions[command](heroes, heroName, ...params);
    }

    let sorted = Object.entries(heroes);
    sorted.sort(compare);
    sorted.forEach(hero => {
        console.log(hero[0]);
        console.log(`HP: ${hero[1].HP}`);
        console.log(`MP: ${hero[1].MP}`);
    });

    function compare(a, b){
        return b[1].HP - a[1].HP || a[0].localeCompare(b[0]);
    }

}