function solve(input) {
    let actions = {
        InsertSpace(message, place) {
            let newMessage = "";
            for (let index = 0; index < message.length; index++) {
                if (index == Number(place)) {
                    newMessage += " ";
                }
                newMessage += message[index];
            }
            return newMessage;
        },
        Reverse(message, substring) {
            // oIf the message contains the given substring, cut it out, reverse it and add it at the end of the message. 
            // oIf not, print "error". 
            // oThis operation should replace only the first occurrence of the given substring if there are more than one such occurrences.
            index = message.indexOf(substring);
            let newPass = message;
            if(index != -1){
                let reversed = "";
                for (let i = substring.length-1; i > -1; i--) {
                    const element = substring[i];
                    reversed += element;
                }
                newPass = message.substring(0, index) + message.substring(index + substring.length+1)+reversed;
            } else { 
                console.log("error");
            }

            return newPass;
        },
        ChangeAll(message, substring, substitute) {
            // oChanges all occurrences of the given substring with the replacement text.
            let firstPos = message.indexOf(substring);
            if (firstPos == -1) {
                return message;
            }

            while (firstPos != -1) {
                message = message.replace(substring, substitute);
                firstPos = message.indexOf(substring);
            }
            return message;
        }
    }
    // console.log(input);
    let message = input.shift();
    let line;
    while ((line = input.shift()) != "Reveal") {
        let [command, ...params] = line.split(":|:");
        // message = actions["InsertSpace"]("hellodarling!", 5);
        // message = actions["Reverse"]("hellodar!gnil!", "!gnil");
        // console.log(message);
        let newMessage = actions[command](message, ...params);
        if(newMessage != message){
            message = newMessage;
            console.log(message);
        }
    }

    console.log("You have a new text message: " + message);

    // console.log(input);

}

// solve([
//     'heVVodar!gniV',
//     'ChangeAll:|:V:|:l',
//     'Reverse:|:!gnil',
//     'InsertSpace:|:5',
//     'Reveal'
// ]);

// console.log("-----");
solve([
    'Hiware?uiy',
    'ChangeAll:|:i:|:o',
    'Reverse:|:?uoy',
    'Reverse:|:jd',
    'InsertSpace:|:3',
    'InsertSpace:|:7',
    'Reveal'
]
);