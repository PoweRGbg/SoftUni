const { expect } = require("chai");
const { lookupChar } = require('../03-lookup');

describe('03 tests', function () {
    it('not a string', function () {
        expect(lookupChar(1, 1)).to.equal(undefined);
        expect(lookupChar('1,1', 'a')).to.equal(undefined);
        expect(lookupChar('1,1', 0.5)).to.equal(undefined);
    });
    // oIf both parameters are of the correct type but the value of the index is incorrect 
    //(bigger than or equal to the string length or a negative number) - return "Incorrect index". 
    it('invalid index', function () {
        expect(lookupChar('1,1', 3)).to.equal("Incorrect index");
        expect(lookupChar('1,1', -1)).to.equal("Incorrect index");
        expect(lookupChar('', 0)).to.equal('Incorrect index');
    });
    // oIf both parameters have correct types and values - return the character at the specified index in the string.
    it('correct unput', function () {
        expect(lookupChar('1,1', 0)).to.equal('1');
        expect(lookupChar('0', 0)).to.equal('0'.charAt(0));
    });
});