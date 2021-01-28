function calories(input){
    let resultArr = {};
    for (let index = 0; index < input.length; index+=2) {
        const element = input[index];
        const calories = Number(input[index+1]);
        resultArr[element] = calories;
    }
    console.log(resultArr);
}

calories(['Yoghurt', '48', 'Rise', '138', 'Apple', '52'])