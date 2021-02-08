let mathEnforcer = {
    addFive: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof (num1) !== 'number' || typeof (num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

const { expect } = require("chai");

describe('MathEnforcer', function () {
    it('addFive', function () {
        expect(mathEnforcer.addFive(1)).to.equal(6);
        expect(mathEnforcer.addFive(-1)).to.equal(4);
        expect(mathEnforcer.addFive(0.2)).to.be.closeTo(5.2, 0.01);
        expect(mathEnforcer.addFive(-0.2)).to.be.closeTo(4.8, 0.01);
        expect(mathEnforcer.addFive('1')).to.equal(undefined);
    });
    it('subtractTen', function () {
        expect(mathEnforcer.subtractTen(1)).to.equal(-9);
        expect(mathEnforcer.subtractTen(-1)).to.equal(-11);
        expect(mathEnforcer.subtractTen(10.05)).to.be.closeTo(0.05, 0.01);
        expect(mathEnforcer.subtractTen(-10.05)).to.be.closeTo(-20.05, 0.01);
        expect(mathEnforcer.subtractTen('1')).to.equal(undefined);
    });
    it('sum', function () {
        expect(mathEnforcer.sum(1, 1)).to.equal(2);
        expect(mathEnforcer.sum(-1, -1)).to.equal(-2);
        expect(mathEnforcer.sum(1, -1)).to.equal(0);
        expect(mathEnforcer.sum(1, 0.3)).to.be.closeTo(1.3, 0.01);
        expect(mathEnforcer.sum(-1, 0.3)).to.be.closeTo(-0.7, 0.01);
        expect(mathEnforcer.sum(1, -0.3)).to.be.closeTo(0.7, 0.01);
        expect(mathEnforcer.sum(-1, -0.3)).to.be.closeTo(-1.3, 0.01);
        expect(mathEnforcer.sum('1', 1)).to.equal(undefined);
        expect(mathEnforcer.sum(1, '1')).to.equal(undefined);
        expect(mathEnforcer.sum('1', '1')).to.equal(undefined);
    });

});