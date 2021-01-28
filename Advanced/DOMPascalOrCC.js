function pascalOrCamel(input){
    // let input = document.getElementById('text').value.split(' ');
    input = input.split(' ');
    // let caseInput = document.getElementById('naming-convention').value;
    // make any word with capitol letter
    let result = [];
    input.forEach((word,i) => {
        result.push(word.slice(0,1).toUpperCase() + word.slice(1));
        // word[0] = word[0].toUpeerCase();
    });
    console.log(result.join(''));
}

pascalOrCamel('this is an example');