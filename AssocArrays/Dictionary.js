function solve(input1) {
    let input = input1;
    let dictionary = []; // array of terms

    class Term{
        constructor(term, description){
            this.term = term;
            this.description = description;
        }
    }

    function termAtPos(name) {
        for (let index = 0; index < dictionary.length; index++) {
            const element = dictionary[index];
            if (element.term == name) {
                return index;
            }
        }
        return -1;
    }

    input.forEach(element => {
        let line = JSON.parse(element);
        let term = Object.keys(line)[0];
        let description = line[term];
        // search for appearance in the list and change description if it already exists
        let position = termAtPos(term);
        if(position >= 0){
            dictionary[position].description = description;
        } else {
            let newTerm = new Term(term, description);
            dictionary.push(newTerm);
        }

    });
     
    // Sort dictionary
    dictionary.sort(function(a, b) {
        var termA = a.term.toUpperCase(); 
        var termB = b.term.toUpperCase(); 
        if (termA < termB) {
          return -1;
        }
        if (termA > termB) {
          return 1;
        }
        return 0;
      });

    //print dictionary
    dictionary.forEach(element => {
        console.log(`Term: ${element.term} => Definition: ${element.description}`);        
    });

}

solve([
    '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
    '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
    '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
    '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
    '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}',
    '{"Bus":"moving."}',
    ]);