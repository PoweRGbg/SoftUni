class Hex {
    constructor(value) {
        this._value = value;
    }

    valueOf() {
        return this._value;
    }
    toString() {
        return '0x' + this._value.toString(16).toUpperCase();
    }
    plus(number) {
        if (typeof number != 'number') {
            number = number.valueOf();
        }
        return new Hex(this._value + number);
    }
    minus(number) {
        if (typeof number != 'number') {
            number = number.valueOf();
        }
        return new Hex(this._value - number);
    }
    parse(hexStr) {
        let splitted = hexStr.split('0x');
        return parseInt(splitted[1], 16);
    }
}
let FF = new Hex(255);
console.log(FF.toString());
let something = FF.valueOf();
console.log((FF.valueOf() + 1) == 256);
let a = new Hex(10);
let b = new Hex(5);
let str = a.plus(b).toString();
console.log(a.plus(b).toString());
console.log(a.plus(b).toString() == '0xF');