function solve(input) {
    let towns = {};
    let actions = {
        
        Prosper(towns, name, gold) {
            gold = Number(gold);
            if(gold < 0){
                console.log("Gold added cannot be a negative number!");
            } else {
                towns[name]['gold'] += Number(gold);
                console.log(`${gold} gold added to the city treasury. ${name} now has ${towns[name]['gold']} gold.`);
            }
        },
        Plunder(towns, name, people, gold) {
            if(towns[name] != undefined){
                towns[name]['gold'] -= Number(gold);
                towns[name]['population'] -= Number(people);
                console.log(`${name} plundered! ${gold} gold stolen, ${people} citizens killed.`);
                if(towns[name]['gold'] <= 0 ||  towns[name]['population'] <= 0){
                    delete towns[name];
                    console.log(`${name} has been wiped off the map!`);
                    
                }
            } else {
                // console.log(`Invalid operation! ${name} does not exist in the collection.`);
            }

        }
    }

    let cityline;
    while ((cityline = input.shift()) != "Sail") {
            let [town, pop, gold] = cityline.split("||");
            if(towns[town] != undefined){
                towns[town]['gold'] += Number(gold);
                towns[town]['population'] += Number(pop);

            } else {
                    towns[town] = {
                        'population': Number(pop),
                        'gold': Number(gold)
                }
            }

    }
    
    let line;
    while ((line = input.shift()) != "End") {
            let [command, town, ...params] = line.split("=>");
            actions[command](towns, town, ...params);
        }
        
    let sorted = Object.entries(towns);
    sorted.sort(compare);
    if(sorted.length > 0){
        console.log(`Ahoy, Captain! There are ${sorted.length} wealthy settlements to go to:`);
        sorted.forEach(town => {
            console.log(`${town[0]} -> Population: ${town[1][`population`]} citizens, Gold: ${town[1][`gold`]} kg`);
        });
        
    } else {
        console.log("Ahoy, Captain! All targets have been plundered and destroyed!");
        
    }

    function compare(a, b){
        return b[1].gold - a[1].gold || a[0].localeCompare(b[0]);
    }

}
// solve([
//     'Tortuga||345000||1250',
//     'Santo Domingo||240000||630',
//     'Havana||410000||1100',
//     'Sail',
//     'Plunder=>Tortuga=>75000=>380',
//     'Prosper=>Santo Domingo=>180',
//     'End'
//   ]
//   );

solve([
  'Nassau||95000||1000',
  'San Juan||930000||1250',
  'Campeche||270000||690',
  'Port Royal||320000||1000',
  'Port Royal||100000||2000',
  'Sail',
  'Prosper=>Port Royal=>-200',
  'Plunder=>Nassau=>94000=>750',
  'Plunder=>Nassau=>1000=>150',
  'Plunder=>Campeche=>150000=>690',
  'End'
]
);