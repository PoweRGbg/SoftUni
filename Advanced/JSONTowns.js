function towns(table){
    const firstRow = table.shift();
    const regEx = /[|\s]([\w\d.\s?-]+)[\s|]/gm;
    let towns = [];
    let field;
    let fields = [];
    while((field = regEx.exec(firstRow)) != null){
        fields.push(field[1].trim());
    }
    table.forEach(row => {
        let town = {};
        let cols = [];
        while((field = regEx.exec(row)) != null){
            cols.push(field[1].trim());
        }
        for (let index = 0; index < fields.length; index++) {
            town[fields[index]] = index == 0 ? cols[index]:Number(Number(cols[index]).toFixed(2));
        }
        towns.push(town);
    });
    console.log(JSON.stringify(towns));

}

towns(['| Town | Latitude | Longitude |',
'| Delhi |  28.38 | 77.12 |',
'| Is it a real town? | 71.42 | -13.91 |']);