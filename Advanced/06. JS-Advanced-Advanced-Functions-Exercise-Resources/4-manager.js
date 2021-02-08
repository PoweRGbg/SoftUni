function solution() {
    let ingredients = {
        carbohydrate: 0,
        fat: 0,
        protein: 0,
        flavour: 0,

    }
    let recipes = {
        apple: { carbohydrate: 1, flavour: 2 },
        lemonade: { carbohydrate: 10, flavour: 20 },
        burger: { carbohydrate: 5, fat: 7, flavour: 7 },
        eggs: { protein: 5, fat: 1, flavour: 1 },
        turkey: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 }
    }

    function doSomething(input) {
        input = input.split(' ');
        let map = {
            restock(which, howMuch) {
                ingredients[which] += Number(howMuch);
                console.log('Success');
            },

            prepare(which, howMuch) {
                let needed = recipes[which];
                let ingrNeeded = Object.keys(needed);
                let gotEverything = true;
                ingrNeeded.forEach(ingrNeeded => {
                    let totalNeeded = Number(howMuch) * needed[ingrNeeded];
                    if (totalNeeded > ingredients[ingrNeeded] && gotEverything) {
                        console.log(`Error: not enough ${ingrNeeded} in stock`);
                        gotEverything = false;
                    }
                });
                // We have all the ingredients
                if(gotEverything){
                    ingrNeeded.forEach(current => {
                        let totalNeeded = Number(howMuch) * Number(needed[current]);
                        ingredients[current] -= totalNeeded;
                    });
                    console.log('Success');
                }
            },
            report() {
                console.log(`protein=${ingredients.protein} carbohydrate=${ingredients.carbohydrate} fat=${ingredients.fat} flavour=${ingredients.flavour}`);
            }
        };
        console.log(input.join(','));
        map[input[0]](input[1], input[2]);

    };

    return doSomething;
}

let manager = solution();
manager('restock flavour 50');
manager('prepare lemonade 4');
// manager("report");