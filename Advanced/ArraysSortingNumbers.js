function sortNum(array){
    let result = [];
    array = array.sort((a, b) => a-b);
    for (let index = 0; index < array.length / 2 ; index++) {
            result.push(array[index]);
            if(index != array.length - index - 1)
                result.push(array[array.length-index-1]);
    }
    // console.log(result);
    return result;
}

sortNum([1, 65, 3, 52, 48, 63, 31, -3, 18, 56, 1]);