const { expect } = require("chai");
const { assert } = require("chai");
pizzUni = {
    makeAnOrder: function (obj) {

        if (!obj.orderedPizza) {
            throw new Error('You must order at least 1 Pizza to finish the order.');
        } else {
            let result = `You just ordered ${obj.orderedPizza}`
            if (obj.orderedDrink) {
                result += ` and ${obj.orderedDrink}.`
            }
            return result;
        }
    },

    getRemainingWork: function (statusArr) {

        const remainingArr = statusArr.filter(s => s.status != 'ready');

    if (remainingArr.length > 0) {

        let pizzaNames = remainingArr.map(p => p.pizzaName).join(', ')
        let pizzasLeft = `The following pizzas are still preparing: ${pizzaNames}.`
        
        return pizzasLeft;
    } else {
        return 'All orders are complete!'
    }

    },

    orderType: function (totalSum, typeOfOrder) {
        if (typeOfOrder === 'Carry Out') {
            totalSum -= totalSum * 0.1;

            return totalSum;
        } else if (typeOfOrder === 'Delivery') {

            return totalSum;
        }
    }
}

describe('PizzaUni', function () {
    it('Make an order', function () {
        let pizza = { orderedPizza: 'pizza', orderedDrink: 'cola' };
        let pizza1 = { orderedPizza: 'pizza' };
        assert.equal(pizzUni.makeAnOrder(pizza), `You just ordered pizza and cola.`);
        assert.equal(pizzUni.makeAnOrder(pizza1), `You just ordered pizza`);
        assert.throw(() => pizzUni.makeAnOrder({}), 'You must order at least 1 Pizza to finish the order.')
    });

    it('remaining work', function () {
        let status = [{ pizzaName: 'pizza', status: 'ready' },
        { pizzaName: 'pizza', status: 'ready' },
        { pizzaName: 'pizza1', status: 'preparing' },
        { pizzaName: 'pizza2', status: 'preparing' }];
        let status4 = [];
        assert.equal(pizzUni.getRemainingWork(status), 'The following pizzas are still preparing: pizza1, pizza2.');
        assert.equal(pizzUni.getRemainingWork(status4), 'All orders are complete!');
        
    });
    it('order type', function () {
        let totalSum = 100;
        const carryOut = 'Carry Out';
        const delivery = 'Delivery';

        assert.equal(pizzUni.orderType(totalSum, carryOut),90);
        expect(pizzUni.orderType(totalSum, delivery)).to.equal(100);
    });
});