function solve(input) {
    // parse input
    let actions = {
        TakeOdd(key) {
            // Takes only the characters at odd indices and concatenates them together to
            //  obtain the new raw key and then prints it.
            let newPass = "";
            for (let index = 1; index < key.length; index+=2) {
                newPass += key[index];
            }
            console.log(newPass);
            return newPass;
        },
        Slice(key, start, end){
            start = Number(start);
            end = Number(end);
            let newPass = key.substring(0, start)+ key.substring(end);
            //then prints the key on the console.
            console.log(newPass);
            return newPass;
        },
        Flip(key, to, first, last){
            let toFlip = key.substring(first, last);
            
            if(to == "Upper") {
                toFlip = toFlip.toUpperCase();
            } else {
                toFlip = toFlip.toLowerCase();
                
            }
            key = key.substring(0, first) + toFlip + key.substring(last);
            console.log(key);
            return key;
        },
        Contains(key, search){
            let firstPos = key.indexOf(search);
            if(firstPos == -1){
                console.log("Substring not found!");
            } else {
                console.log(`${key} contains ${search}`);
                
            }

            return key;
        }

    }
    // console.log(input);
    let key = input.shift();
    let line;
    while ((line = input.shift()) != "Generate") {
        let [command, ...params] = line.split(">>>");
        key = actions[command](key, ...params);
    }

    console.log(`Your activation key is: ${key}`);
}

solve([
    'abcdefghijklmnopqrstuvwxyz',
    'Slice>>>2>>>6',
    'Flip>>>Upper>>>3>>>14',
    'Flip>>>Lower>>>5>>>7',
    'Contains>>>def',
    'Contains>>>deF',
    'Generate'
  ]
  );

console.log("-----");
solve([
    '134softsf5ftuni2020rockz42',
    'Slice>>>3>>>7',
    'Contains>>>-rock',
    'Contains>>>-uni-',
    'Contains>>>-rocks',
    'Flip>>>Upper>>>2>>>8',
    'Flip>>>Lower>>>5>>>11',
    'Generate'
  ]
  );
