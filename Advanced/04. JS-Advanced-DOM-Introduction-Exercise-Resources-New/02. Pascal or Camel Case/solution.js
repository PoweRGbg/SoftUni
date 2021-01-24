function solve() {
    let input = document.getElementById('text').value.split(' ');
    let caseInput = document.getElementById('naming-convention').value;
    let result = document.getElementById('result').innerHTML;
    // make any word with capital letter
    
    input.forEach((word,i) => {
        if(caseInput == "Pascal Case"){
          document.getElementById('result').innerHTML += (word.slice(0,1).toUpperCase() + word.slice(1).toLowerCase());  
        } else if (caseInput == "Camel Case" ){
          if(i == 0){
            document.getElementById('result').innerHTML += (word.slice(0,1).toLowerCase() + word.slice(1).toLowerCase());  
          }else {
            document.getElementById('result').innerHTML += (word.slice(0,1).toUpperCase() + word.slice(1).toLowerCase());  
          }
        } else {
          document.getElementById('result').innerHTML = "Error!";
        }

    });
    // if(Array.isArray(result)){
    //   // console.log(result.join(''));
    //   element = result.join('');
    // } else {
    //   // console.log(result);
    //   element = result;
    // }
}