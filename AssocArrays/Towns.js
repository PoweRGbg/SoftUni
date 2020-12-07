function solve(input) {
    
    class Town {
        constructor(name, latitude, longtitude){
            this.town = name;
            this.latitude = Number(latitude).toFixed(2);
            this.longitude = Number(longtitude).toFixed(2);
        }
    }

    for (let index = 0; index < input.length; index++) {
        const element = input[index].split(" | ");
        let town = new Town(element[0], element[1], element[2]);
        output += `town: '${town.town}', `;
        output += `latitude: '${town.latitude}', `;
        output += `longitude: '${town.longitude}' `;
        output += "}";
        console.log(output);
    }

}

solve(['Sofia | 42.696552 | 23.32601',
'Beijing | 39.913818 | 116.363625']);