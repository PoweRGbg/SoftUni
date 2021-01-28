function rotate(array, rotations){
    rotations = rotations % array.length;
    for (let index = 0; index < rotations; index++) {
        const element = array.pop();
        array.unshift(element);
    }
    console.log(array.join(' '));
}
rotate(['1', 
'2', 
'3', 
'4'], 
2);
rotate(['Banana', 
'Orange', 
'Coconut', 
'Apple'], 
15);
// rotate();
// rotate();