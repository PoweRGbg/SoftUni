function makeJuice(input) {
    let juices = {};
    let bottles = {};
    input.forEach(element => {
        const fruit = element.split(' => ')[0];
        const pieces = element.split(' => ')[1];
        if (juices[fruit] == undefined) {
            juices[fruit] = 0;
        }
        juices[fruit] += Number(pieces);
        if (juices[fruit] > 999) {
            if(bottles[fruit]== undefined){
                bottles[fruit] = 0;
            }
            bottles[fruit] += Number((juices[fruit] / 1000).toFixed(0));
            juices[fruit] = juices[fruit] % 1000;
        }

    });
    for (const fruit in bottles) {
        console.log(`${fruit} => ${bottles[fruit]}`);
    }
}


makeJuice(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549']);