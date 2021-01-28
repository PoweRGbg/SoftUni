function lowest(input) {
    let products = {};
    input.forEach(town => {
        town = town.split(' | ');
        // check if product exists
        if (products[town[1]] == undefined) {
            products[town[1]] = {
                townName: town[0],
                productLowestPrice: Number(town[2])
            };
        } else if (products[town[1]].productLowestPrice > Number(town[2])) {
            products[town[1]] = {
                townName: town[0],
                productLowestPrice: Number(town[2])
            };
        }
    });
    let keys = Object.keys(products);
    for (const product of keys) {
        console.log(`${product} -> ${products[product].productLowestPrice} (${products[product].townName})`);
    }
}

lowest(['Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 100000',
    'Mexico City | BMW | 99999',
    'New York City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Mexico City | Audi | 100000',
    'Washington City | Mercedes | 1000']);