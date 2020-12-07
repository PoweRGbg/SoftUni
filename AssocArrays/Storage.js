function solve() {
    class Storage {
        constructor(capacity) {
            this.capacity = capacity;
            this.storage = [];

            this.totalCost = 0;

            this.addProduct = function (product) {
                // add a product to storage but only of there is enough space 
                if(product.name != undefined && product.price != undefined && product.quantity !=undefined){
                    if(this.capacity >= product.quantity){
                        this.capacity -= Number(product.quantity);
                        this.totalCost += Number(product.price) * Number(product.quantity);
                        this.storage.push(product);
                    }
                    
                }
                
            }
            this.getProducts = function () {
                // list all the products
                let output = JSON.stringify(this.storage.shift());
                this.storage.forEach(product => {
                    output += "\n"+JSON.stringify(product);
                });
                return output;
            }
        }
    }


    let productOne = {name: 'Cucamber', price: 1.50, quantity: 15};
    let productTwo = {name: 'Tomato', price: 0.90, quantity: 25};
    let productThree = {name: 'Bread', price: 1.10, quantity: 8};
    let storage = new Storage(50);
    storage.addProduct(productOne);
    storage.addProduct(productTwo);
    storage.addProduct(productThree);
    console.log(storage.getProducts());
    console.log(storage.capacity);
    console.log(storage.totalCost());
}

solve();

