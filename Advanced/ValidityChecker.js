function validityChecker(x1, y1, x2, y2){

    function valid(x1, y1, x2, y2){
        let result = (Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)));
        if(result % 1 != 0){
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
        } else {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
        }
    }

    valid(x1,y1, 0,0);
    valid(x2,y2, 0,0);
    valid(x1,y1, x2,y2);
}
validityChecker(3,0,0,4);
validityChecker(2,1,1,1);