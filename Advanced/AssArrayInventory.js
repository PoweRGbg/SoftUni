function inventory(input){
    let heroes = [];
    input.forEach(hero => {
        hero = hero.split(' / ');
        
        heroes.push({name: hero[0],
            level: Number(hero[1]),
            items: hero[2]?hero[2].split(', '): []
        });
    });
    console.log(JSON.stringify(heroes));
}

inventory(['Isacc / 25 / Apple, GravityGun',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara']);