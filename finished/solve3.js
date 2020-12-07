function solve3(x1, y1, x2, y2){
    let length1 = x2 - x1;
    let length2 = y2 - y1;
    let distance = Math.sqrt(length1*length1 + length2*length2);    
    console.log(distance);
    
}

solve3(2.34, 15.66, -13.55, -2.9985);