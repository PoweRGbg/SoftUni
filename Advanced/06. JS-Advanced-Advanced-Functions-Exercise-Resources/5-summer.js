function sum(num) {
    let total = 0;
    total += num;
    
    function calc(a){
        total +=a;
        return calc;
    }

    calc.toString = () => total;
    return calc;
};
console.log(""+sum(1)(4)(-3));