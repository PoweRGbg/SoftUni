const { expect } = require("chai");

class Calculator {
    constructor() {
        this.expenses = [];
    }

    add(data) {
        this.expenses.push(data);
    }

    divideNums() {
        let divide;
        for (let i = 0; i < this.expenses.length; i++) {
            if (typeof (this.expenses[i]) === 'number') {
                if (i === 0 || divide===undefined) {
                    divide = this.expenses[i];
                } else {
                    if (this.expenses[i] === 0) {
                        return 'Cannot divide by zero';
                    }
                    divide /= this.expenses[i];
                }
            }
        }
        if (divide !== undefined) {
            this.expenses = [divide];
            return divide;
        } else {
           throw new Error('There are no numbers in the array!')
        }
    }

    toString() {
        if (this.expenses.length > 0)
            return this.expenses.join(" -> ");
        else return 'empty array';
    }

    orderBy() {
        if (this.expenses.length > 0) {
            let isNumber = true;
            for (let data of this.expenses) {
                if (typeof data !== 'number')
                    isNumber = false;
            }
            if (isNumber) {
                return this.expenses.sort((a, b) => a - b).join(', ');
            }
            else {
                return this.expenses.sort().join(', ');
            }
        }
        else return 'empty';
    }
}


describe('ChristmasMovies', function () {
    it("instance", function () {
        //Initialize the repository
        let calc = new Calculator();
        expect(calc.expenses).to.deep.equal([]);
    });

    it("add", function () {
        //Initialize the repository
        let calc = new Calculator();
        calc.add(10);
        calc.add('10');
        expect(calc.expenses).to.deep.equal([10, '10']);
    });

    it("divide", function () {
        //Initialize the repository
        let calc = new Calculator();
        calc.add('10');
        expect(()=>{calc.divideNums()}).to.throw('There are no numbers in the array!');
        calc.add(10);
        calc.add(2);
        expect(calc.divideNums()).to.equal(5);
        calc.add(0);
        expect(calc.divideNums()).to.equal('Cannot divide by zero');
    });

    it("toString(_", function () {
        //Initialize the repository
        let calc = new Calculator();
        expect(calc.toString()).to.equal('empty array');
        calc.add(10);
        calc.add(2);
        expect(calc.toString()).to.equal('10 -> 2');
    });


    it("orderBy", function () {
        //Initialize the repository
        let calc = new Calculator();
        expect(calc.orderBy()).to.equal('empty');
        calc.add(10);
        calc.add(2);
        expect(calc.orderBy()).to.equal('2, 10');
        calc.add('a');
        expect(calc.orderBy()).to.equal('10, 2, a');
    });
});
