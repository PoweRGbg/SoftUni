function solve(input) {
    let actions = {
        TakeOdd(password) {
            // Takes only the characters at odd indices and concatenates them together to
            //  obtain the new raw password and then prints it.
            let newPass = "";
            for (let index = 1; index < password.length; index+=2) {
                newPass += password[index];
            }
            console.log(newPass);
            return newPass;
        },
        Lowercase(password){
            let newPass = password.toLowerCase();
            //then prints the password on the console.
            console.log(newPass);
            return newPass;
        },
        Includes(password, char){
            let index = password.indexOf(char);
            if(index > -1){
                console.log("True");
            } else {
               console.log("False");
            }
            return password;
        },
        FindIndex(password, char){
            let index = password.lastIndexOf(char);
            console.log(index);
            return password;
        },
        Start(password, substring){
           if(password.substring(0, substring.length) == substring){
               console.log("True");
            } else {
               console.log("False");
           }
            return password;
        },
        Remove(password, start, count){
            start = Number(start);
            count = Number(count);
            password = password.substring(0, start) + password.substring(start+count);
            console.log(password);
            return password;
        },
        Translate(password, substring, substitute){
            let firstPos = password.indexOf(substring);
            while(firstPos != -1){
                password = password.replace(substring, substitute);
                firstPos = password.indexOf(substring);
            }
            console.log(password);
            return password;
        }
    }
    let password = input.shift();
    let line;
    while ((line = input.shift()) != "End") {
        let [command, ...params] = line.split(" ");
        password = actions[command](password, ...params);
    }

    // console.log(`Your password is: ${password}`);

}
solve([
    '//Thi5 I5 MY 5trING!//',
    'Translate 5 s',
    'Includes string',
    'Start //This',
    'Lowercase',
    'FindIndex i',
    'Remove 0 10',
    'End'
  ]);