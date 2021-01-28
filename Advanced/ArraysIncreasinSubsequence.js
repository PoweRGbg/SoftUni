function subsequence(array){
    let biggest = array[0];
    let result= [];
    result = array.reduce(reducer);
    console.log(result);
    return result;

    function reducer(acc, element){
        if(acc >= element){
            return acc;
        } else {
            return element;
        }
    }
}

subsequence([20, 
    21, 
    2, 
    15,
    22, 
    1]);
// subsequence();
// subsequence();
// subsequence();