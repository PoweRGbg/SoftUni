function solve(input1, input2) {
    let stock = input1;
    let ordered = input2;
    let products = [];

    class Product {
        constructor(name, quantity){
            this.name = name;
            this.quantity = Number(quantity);
        }
    }
    // parse all products in an array
    for (let index = 0; index < stock.length; index+=2) {
        let element = new Product(stock[index], stock[index+1]);
        products.push(element);
    }

    //parse orderes
    for (let index = 0; index < ordered.length; index+= 2) {
        let element = new Product(ordered[index], ordered[index+1]);
        if(productPos(element.name) >= 0){
            // console.log(`found ${element.name} at pos ${productPos(element.name)}`);
            products[productPos(element.name)].quantity += element.quantity;
        } else {
            products.push(element);
        }
    }

    products.forEach(element => {
        console.log(`${element.name} -> ${element.quantity}`);
    });

    function productPos(name){
        for (let index = 0; index < products.length; index++) {
            const element = products[index];
            if(element.name == name){
                return index;
            }
        }
        return -1;
    }

}

solve([
    'Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'
    ],
    [
    'Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30'
    ]);