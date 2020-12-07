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
        Cut(password, index, length){
            // oGets the substring with the given length starting from the given index 
            //from the password and removes its first occurrence of it, 
            //The given index and length will always be valid.
            index = Number(index);
            length = Number(length);
            let toCut = password.substring(index, index+length);
            index = password.indexOf(toCut);
            let newPass = password.substring(0, index)+ password.substring(index+length);
            //then prints the password on the console.
            console.log(newPass);
            return newPass;
        },
        Substitute(password, substring, substitute){
            let firstPos = password.indexOf(substring);
            if(firstPos == -1){
                console.log("Nothing to replace!");
                return password;
            } 

            while(firstPos != -1){
                password = password.replace(substring, substitute);
                firstPos = password.indexOf(substring);
            }
            console.log(password);
            return password;
        }
    }
    // console.log(input);
    let password = input.shift();
    let line;
    while ((line = input.shift()) != "Done") {
        let [command, ...params] = line.split(" ");
        password = actions[command](password, ...params);
    }

    console.log(`Your password is: ${password}`);

}