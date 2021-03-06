function carCompanies(input){
    let brands = {};
    input.forEach(element => {
        const brand = element.split(' | ')[0];
        const model = element.split(' | ')[1];
        const pieces = Number(element.split(' | ')[2]);
        if (brands[brand] == undefined) {
            brands[brand] = {};
        }
        if(brands[brand][model] == undefined){
            brands[brand][model] = 0;
        }
        brands[brand][model] += Number(pieces);

    });

    // output
    for (const brand in brands) {
        if (Object.hasOwnProperty.call(brands, brand)) {
            const element = brands[brand];
            console.log(brand);
            for (const model in brands[brand]) {
                if (Object.hasOwnProperty.call(brands[brand], model)) {
                    const pieces = brands[brand][model];
                    console.log(`###${model} -> ${pieces}`);
                }
            }
        }
    }
}
carCompanies(['Audi | Q7 | 1000',
'Audi | Q6 | 100',
'BMW | X5 | 1000',
'BMW | X6 | 100',
'Citroen | C4 | 123',
'Volga | GAZ-24 | 1000000',
'Lada | Niva | 1000000',
'Lada | Jigula | 1000000',
'Citroen | C4 | 22',
'Citroen | C5 | 10']);