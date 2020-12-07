function solve(input1){
    let x1 = parseInt(input1[0]);
    let y1 = parseInt(input1[1]);
    let x2 = parseInt(input1[2]);
    let y2 = parseInt(input1[3]);

    validate(x1, y1, 0,0);
    validate(x2, y2, 0,0);
    validate(x1, y1, x2,y2);


    function validate(x1, y1, x2, y2){
        let a = x1 - x2; //length of side a
        let b = y1 - y2; // side b
        let c = Math.sqrt(a*a + b*b);
        // console.log(`a(${a}) b(${b}) c(${c}) `);
        if(isInteger(c.toString())){
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
        } else {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
        }
    }

    function isInteger(str){
        for (let index = 0; index < str.length; index++) {
            const element = str[index];
            if(isNaN(element)){
                return false;
            }         
        }
        return true;
    }

}
solve([3, 0, 0, 4]);