function solve(input) {
    let plants = {};
    let actions = {
        Rate(plants, name, howMuch) {
            if(plants[name] === undefined){
                console.log(`error`);
                
            } else 
            plants[name].ratings.push(Number(howMuch));

        },
        Update(plants, name, howMuch) {
            if(plants[name] === undefined){
                console.log(`error`);
                
            } else 
            plants[name].rarity = Number(howMuch);

        },
        Reset(plants, name) {
            if(plants[name] === undefined){
                console.log(`error`);
                
            } else 
            plants[name].ratings = [];
        }
    }

    let numberOfPlants = Number(input.shift());
    for (let index = 0; index < numberOfPlants; index++) {
        let [name, rarity] = input.shift().split("<->");
        plants[name] = {
            rarity: Number(rarity),
            ratings: []
        }

    }

    let line;
    while ((line = input.shift()) != "Exhibition") {
        let [command, pars] = line.split(": ");
        if (typeof actions[command] === "function") { 
            let[name, ...params] = pars.split(" - ");
            actions[command](plants, name, ...params);
        } else {
            console.log("error");
            
        }
    }

    let sorted = Object.entries(plants);
    sorted.sort(compare);
    console.log("Plants for the exhibition:");
    sorted.forEach(plant => {
        
        console.log(`- ${plant[0]}; Rarity: ${plant[1][`rarity`]}; Rating: ${average(plant).toFixed(2)}`);
        
    });

    function compare(a, b){
        return b[1].rarity - a[1].rarity || average(b) - average(a);
    }

    function average(plant){
        let avg = 0;
        plant[1][`ratings`].forEach(element => {
            avg += element;
        });
        if(avg != 0){
            avg = avg/plant[1][`ratings`].length;
        }

        return avg;
    }

}
solve([
    '3',
    'Arnoldii<->4',
    'Woodii<->7',
    'Welwitschia<->2',
    'Rate: Woodii - 10',
    'Rate: Welwitschia - 7',
    'Rate: Arnoldii - 3',
    'Rate: Woodii - 5',
    'Update: Woodii - 5',
    'Reset: Arnoldii',
    'Exhibition'
  ]
);
console.log("----");
solve([
    '2',
    'Candelabra<->10',
    'Oahu<->10',
    'Rate: Oahu - 7',
    'Rate: Candelabra - 6',
    'Exhibition'
  ]
  );
