class ChristmasDinner {
    constructor(budget) {
        this.budget = budget;
        this.dishes = [];
        this.products = [];
        this.guests = {};

    }

    set budget(budget) {
        if (budget >= 0) {
            this._budget = budget;

        } else {
            this.e('The budget cannot be a negative number');
        }
    }

    get budget() {
        return this._budget;
    }

    shopping(product) {
        if (product[1] > this.budget) {
            this.e("Not enough money to buy this product");
        } else {
            this.budget -= product[1];
            this.products.push(product[0]);
            return `You have successfully bought ${product[0]}!`;
        }
    }

    recipes(recipe) {
        let allAvailable = true;
        for (let index = 0; index < recipe.productsList.length; index++) {
            const product = recipe.productsList[index];
            if (this.products.indexOf(product) == -1) {
                allAvailable = false;
            }
        }

        if (allAvailable) {
            let obj = {};
            obj[recipe.recipeName] = recipe.productsList;
            this.dishes.push(obj);
            return `${recipe.recipeName} has been successfully cooked!`;

        } else {
            this.e(`We do not have this product`);
        }
    }

    inviteGuests(name, dish) {
        let dishAvailable = false;
        for (let index = 0; index < this.dishes.length; index++) {
            const currDish = this.dishes[index];
            if (currDish.hasOwnProperty(dish)) {
                dishAvailable = true;
            }
        }
        if (dishAvailable) {
            if (this.guests.hasOwnProperty(name)) {
                this.e("This guest has already been invited");
            } else {
                this.guests[name] = dish;
                return `You have successfully invited ${name}!`
            }

        } else {
            this.e("We do not have this dish");
        }
    }

    showAttendance() {
        let result = '';
        let keys = Object.keys(this.guests);
        for (let index = 0; index < keys.length; index++) {
            const guest = keys[index];
            const dish = this.guests[guest];
            let ingredients = [];
            for (let index = 0; index < this.dishes.length; index++) {
                const currDish = this.dishes[index];
                if (currDish.hasOwnProperty(dish)) {
                    ingredients = currDish[dish];
                }
            }
            result += `${guest} will eat ${this.guests[guest]}, which consists of ${ingredients.join(', ')}\n`;

        }
        return result.trim();
    }

    e(message) {
        throw new Error(message);
    }
}

let dinner = new ChristmasDinner(300);

console.log(dinner.shopping(['Salt', 1]));
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

console.log(dinner.recipes({
    recipeName: 'Oshav',
    productsList: ['Fruits', 'Honey']
}), dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
}), dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
}));

console.log(dinner.inviteGuests('Ivan', 'Oshav'));
console.log(dinner.inviteGuests('Ivana', 'Oshav'));
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.showAttendance());