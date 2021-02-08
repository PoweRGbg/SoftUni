function sortArray(array, order){
    if(order == 'desc'){
        return array.sort((a,b) => b-a);
    } else {
        return array.sort((a,b) => a-b);
    }
}
console.log(sortArray([14, 7, 17, 6, 8], 'asc'));
console.log(sortArray([20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 'desc'));
