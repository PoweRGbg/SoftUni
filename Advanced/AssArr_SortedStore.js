function catalogue(input){
    input.sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    for (let index = 0; index < input.length; index++) {
        const [product , price] = input[index].split(' : ');
        if(index == 0 || product[0] != input[index-1][0] ){
            console.log(product[0]);
        }
        console.log(` ${product}: ${price}`);        
    }

}

catalogue(['Banana : 2',
'Rubic\'s Cube : 5',
'Raspberry P : 4999',
'Rolex : 100000',
'Rollon : 10',
'Rali Car : 2000000',
'Pesho : 0.000001',
'Barrel : 10']);