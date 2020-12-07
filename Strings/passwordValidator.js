function solve(input1){
    let password = input1.toString();
    let valid = true;
    if(isNotLongEnough(password)){
        valid = false;
        console.log(`Password must be between 6 and 10 characters`);
    }
    if(charsAndNumsOnly(password)){
        valid = false;
        console.log(`Password must consist only of letters and digits`);
    }
    if(atLeast2Numbers(password)){
        valid = false;
        console.log(`Password must have at least 2 digits`);
    } 
    
    if(valid){
        console.log(`Password is valid`);
    } 

    function charsAndNumsOnly(input){
        let errors = 0;
        for (let index = 0; index < input.length; index++) {
            const element = input[index];
            if(!isDigit(element) && !isChar(element)){
                errors += 1;
            }
        }
        if(errors != 0){
            return true;
        } else {
            return false;
        }

    }

    function atLeast2Numbers(input){
        let number= 0;
        for (let index = 0; index < input.length; index++) {
            const element = input[index];
            if(isDigit(element)){
                number++;
            }
            
        }
        return number < 2;
    }

    function isChar(input){
        let charcode = input.charCodeAt(0);
        if ( charcode > 64 && charcode < 91){
            //we have a capital letter
            return true;
        } 
        if ( charcode > 96 && charcode < 123){
            // small cap letter
            return true;
        } 
        return false;
    }

    function isDigit(input){
        return Number(input) > -1 && Number(input < 10);
    }

    function isNotLongEnough(input){
        return !(input.length > 5 && input.length < 11);
    }

}
solve(`Pa$s$s`)