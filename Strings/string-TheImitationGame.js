function solve(input) {
    let actions = {
        Move(message, numberOfLetters) {
            // oMoves the first n letters to the back of the string. 
            let moved = message.substring(0, numberOfLetters)
            let newPass = message.substring(numberOfLetters)+ moved;
            // console.log(newPass);
            return newPass;
        },
        Insert(message, index, value){
            // Inserts the given value before the given index in the string 
            index = Number(index);
            let newPass = message.substring(0, index)+ value +message.substring(index);
            //then prints the message on the console.
            // console.log(newPass);
            return newPass;
        },
        ChangeAll(message, substring, substitute){
            // Changes all occurrences of the given substring with the replacement text
            let firstPos = message.indexOf(substring);
            if(firstPos == -1){
                // console.log("Nothing to replace!");
                return message;
            } 

            while(firstPos != -1){
                message = message.replace(substring, substitute);
                firstPos = message.indexOf(substring);
            }
            // console.log(message);
            return message;
        }
    }
    // console.log(input);
    let message = input.shift();
    let line;
    while ((line = input.shift()) != "Decode") {
        let [command, ...params] = line.split("|");
        message = actions[command](message, ...params);
    }

    console.log(`The decrypted message is: ${message}`);

}
solve([ 'zzHe', 'ChangeAll|z|l', 'Insert|2|o', 'Move|3', 'Decode' ]);
console.log("-----");

solve([
    'owyouh',
    'Move|2',
    'Move|3',
    'Insert|3|are',
    'Insert|9|?',
    'Decode']);