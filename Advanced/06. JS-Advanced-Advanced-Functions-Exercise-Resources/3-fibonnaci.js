function getFibonator() {
    let current = 0;
    let previous = 1;
    function fib() {
        let result = current + previous;
        current = previous;
        previous = result;
        return current;
    };

    return fib;
}

let fib = getFibonator();
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());