const { expect } = require("chai");
const numberOperations = {
    powNumber: function (num) {
        return num * num;
    },
    numberChecker: function (input) {
        input = Number(input);

        if (isNaN(input)) {
            throw new Error('The input is not a number!');
        }

        if (input < 100) {
            return 'The number is lower than 100!';
        } else {
            return 'The number is greater or equal to 100!';
        }
    },
    sumArrays: function (array1, array2) {

        const longerArr = array1.length > array2.length ? array1 : array2;
        const rounds = array1.length < array2.length ? array1.length : array2.length;

        const resultArr = [];

        for (let i = 0; i < rounds; i++) {
            resultArr.push(array1[i] + array2[i]);
        }

        resultArr.push(...longerArr.slice(rounds));

        return resultArr
    }
};

describe('HolidayPackage', function () {
    it('pow', function () {
        expect(numberOperations.powNumber(2)).to.equal(4);
    });

    it('pow', function () {
        expect(numberOperations.numberChecker(2)).to.equal('The number is lower than 100!');
        expect(numberOperations.numberChecker(102)).to.equal('The number is greater or equal to 100!');
        expect(numberOperations.numberChecker(100)).to.equal('The number is greater or equal to 100!');
        expect(() => { numberOperations.numberChecker('a') }).to.throw('The input is not a number!');
    });

    it('sumarrays', function () {
        expect(numberOperations.sumArrays([2],[2])).to.deep.equal([4]);
        expect(numberOperations.sumArrays([2],[2,1])).to.deep.equal([4,1]);
        expect(numberOperations.sumArrays([],[])).to.deep.equal([]);
    });

});