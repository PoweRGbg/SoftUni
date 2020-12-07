function solve(input1) {
    let input = input1;
    let heroes = []; // array of heroes

    class Hero{
        constructor(heroName,heroLevel, inventory){
            this.heroName = heroName;
            this.heroLevel = Number(heroLevel);
            this.inventory = inventory.split(", ");
            this.sortInventory = function (){
                this.inventory.sort();
            };
        }
    }

    input.forEach(element => {
        let line = element.split(" / ");
        let newHero = new Hero(line[0], line[1], line[2]);
        newHero.sortInventory();
        heroes.push(newHero);
    });
     
    // Sort heroes
    heroes.sort(function (a, b) {
        return a.heroLevel - b.heroLevel;
      });

    heroes.forEach(element => {
        console.log(`Hero: ${element.heroName}`);
        console.log(`level => ${element.heroLevel}`);
        let items = element.inventory.shift();
        for (let index = 0; index < element.inventory.length; index++) {
            const el = element.inventory[index];
            items += ", "+el;            
        }
        console.log(`items => ${items}`);
    });

}

solve([
    "Isacc / 25 / Apple, GravityGun",
    "Derek / 12 / BarrelVest, DestructionSword",
    "Hes / 1 / Desolator, Sentinel, Antara"
    ]);