const {expect} = require("chai");
const {isOddOrEven} = require('./02-evenOrOdd');
// function isOddOrEven(string) {
//     if (typeof(string) !== 'string') {
//         return undefined;
//     }
//     if (string.length % 2 === 0) {
//         return "even";
//     }

//     return "odd";
// }
describe('test1', function () {
    it('odd', function () {
        expect(isOddOrEven('aaa')).to.equal('odd');
    });
    it('even', function () {
        expect(isOddOrEven('aa')).to.equal('even');
    });
    it('not a string', function () {
        expect(isOddOrEven(1)).to.equal(undefined);
    });
});