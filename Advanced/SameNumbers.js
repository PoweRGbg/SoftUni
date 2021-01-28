function solve(param1){
    let same = true;
    let sum = 0;
    paramStr = ''+param1;
    for (let index = 1; index < paramStr.length; index++) {
        const element = paramStr[index];
        if(element != paramStr[index-1]){
            same = false;
        }
        if(index == 1){
            sum += Number(paramStr[0]);
        }
        sum += Number(paramStr[index]);
    }
    console.log(same);
    console.log(sum);

}

solve(2222222);