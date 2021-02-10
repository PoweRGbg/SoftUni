(function solve() {
    Array.prototype.last = function () {
        return this[this.length-1];
    };
    Array.prototype.skip = function(n) {
        return this.slice(n, this.length);
    };

    Array.prototype.take = function(n) {
        return this.slice(0, n);
    };
    Array.prototype.sum = function() {
        let sum = 0;
        this.forEach(element => {
            sum += element;
        });
        return sum;
    };

    Array.prototype.average = function() {
        return this.sum() / this.length;
    };
    
    // let arr = new Array(1,2,3);
    // console.log(arr.last());
    // console.log(arr.take(3));
    // console.log(arr.skip(1));
    // console.log(arr.sum());
    // console.log(arr.average());
}())

solve();