function nthElement(array, step){
    let result = [];
    for (let index = 0; index < array.length; index++) {
        if(index % step == 0){
            result.push(array[index]);
        }        
    }
   return result;
}

nthElement(['5', 
'20', 
'31', 
'4', 
'20'], 
2);
nthElement(['dsa',
'asd', 
'test', 
'tset'], 
2);
nthElement(['1', 
'2',
'3', 
'4', 
'5'], 
6);