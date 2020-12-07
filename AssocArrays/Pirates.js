function solve(input) {

    // console.log(input);
    let cities = {};
    let assocArr = {};
    let line;
    while ((line = input.shift()) != "Sail") {
        let [city, population, gold] = line.split("||");
        if(cities[city] == undefined){
            cities[city] = {
                "population": Number(population),
                "gold": Number(gold),
            };
        } else {
            cities[city].gold += Number(gold);
            cities[city].population += Number(population);
        }
        
    }
    while (line != "End") {
        let [command, city, param1, param2] = line.split("=>");

        if (command == "Plunder") {
            if (Object.keys(cities).includes(city)) {
                let goldLeft = Number(cities[city].gold) - Number(param2);
                let popLeft = Number(cities[city].population) - Number(param1);
                if (goldLeft <= 0 || popLeft <= 0) {
                    console.log(`${city} plundered! ${Number(param2)} gold stolen, ${Number(param1)} citizens killed.`);
                    delete cities[city];
                    console.log(city+ " has been wiped off the map!");
                } else {
                    console.log(`${city} plundered! ${param2} gold stolen, ${param1} citizens killed.`);
                    cities[city].gold = goldLeft;
                    cities[city].population = popLeft;
                }

            }
        } else if (command == "Prosper") {
            if (Object.keys(cities).includes(city)) {
                if (Number(param1) < 0) {
                    console.log("Gold added cannot be a negative number!");
                } else {
                    let goldLeft = Number(cities[city].gold) + Number(param1);
                    console.log(`${param1} gold added to the city treasury. ${city} now has ${goldLeft} gold.`);
                    cities[city].gold = goldLeft;
                }
            }

        }
        line = input.shift();
    }

    let sorted = Object.keys(cities);
    sorted.sort((cityA, cityB) => {
        if (cities[cityB].gold == cities[cityA].gold)
            return cityA.localeCompare(cityB);
        return cities[cityB].gold - cities[cityA].gold;
    });
    if (sorted.length > 0) {
        console.log(`Ahoy, Captain! There are ${sorted.length} wealthy settlements to go to:`);
        sorted.forEach(city => {
            console.log(`${city} -> Population: ${cities[city].population} citizens, Gold: ${cities[city].gold} kg`);
        });
    } else { 
        console.log("Ahoy, Captain! All targets have been plundered and destroyed!");
    }

}
// solve([
//     'Tortuga||345000||1250',
//     'Santo Domingo||240000||630',
//     'Havana||410000||1100',
//     'Sail',
//     'Plunder=>Tortuga=>75000=>380',
//     'Prosper=>Santo Domingo=>180',
//     'Prosper=>Santo Domingo=>-180',
//     'End'
// ]);
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