class Stringer {
    constructor(string, length) {
        this.innerString = string;
        this.innerLength = length;
    }

    increase(length) {
        this.innerLength += length;
    }

    decrease(length) {
        if (this.innerLength - length < 0) {
            this.innerLength = 0;
        } else {
            this.innerLength -= length;
        }
    }

    toString() {
        if (this.innerString.length > this.innerLength && this.innerLength != 0) {
            return this.innerString.slice(0,this.innerLength) + '...';
        } else if (this.innerLength == 0) {
            return '...';
        } else {
            return this.innerString;
        }
    }
}
let s = new Stringer("Viktor", 6);
s.decrease(3);
console.log(s.toString());