function solve(input1) {
    class Product{
        constructor(name, price){
            this.name = name;
            this.price = Number(price);
        }
    }
    //parsing input
    let catalogue = [];
    let input = input1;
    
    input.forEach(product => {
        let line = product.split(" : ");
        let prod = new Product(line[0], line[1]);
        catalogue.push(prod);
    });


    // now it's time to sort
    catalogue.sort(function(a, b) {
        var termA = a.name.toUpperCase(); 
        var termB = b.name.toUpperCase(); 
        if (termA < termB) {
          return -1;
        }
        if (termA > termB) {
          return 1;
        }
        return 0;
      });

    // print
    for (let index = 0; index < catalogue.length; index++) {
        const product = catalogue[index];
        if(index == 0){
            console.log(product.name.toUpperCase()[0]);
        } else if(catalogue[index].name.toUpperCase()[0] != catalogue[index-1].name.toUpperCase()[0] ){
            console.log(product.name.toUpperCase()[0]);
        }
        console.log(`  ${product.name}: ${product.price}`);
    }
}

solve(["Fridge : 1500",
"TV : 1499",
"Appricot : 20.4",
"Apple : 20"]);

