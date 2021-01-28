function createHero() {
    let hero = {};
    hero.name = '';
    hero.health = 100;

    hero.mage = function (hName) {
        this.name = hName;
        this.mana = 100;
        return hero;
    };

    hero.fighter = function (hName) {
        this.name = hName;
        this.stamina = 100;
        return hero;
    };

    hero.cast = function (spell) {
        if (this.mana > 0) {
            this.mana -= 1;
            console.log(`${this.name} cast ${spell}`);
        }
    };
    
    hero.fight = function () {
        if (this.stamina > 0) {
            this.stamina -= 1;
            console.log(`${this.name} slashes at the foe!`);
        }
    };

    return hero;
}

let create = createHero();
const scorcher = create.mage("Scorcher");
scorcher.cast("fireball")
scorcher.cast("thunder")
scorcher.cast("light")

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight()

console.log(scorcher2.stamina);
console.log(scorcher.mana);