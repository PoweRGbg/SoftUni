function solve(input) {
    // parse input
    let [first, second, third] = input[0].split("|");
    let patternCapitals = /([#$%*&])([A-Z]+)\1/g;
    let capitals = patternCapitals.exec(first)[2];
    let message = third.split(" ");
    let secondPattern = /([\d]+)[:]([\d][\d])/g;
    let words = secondPattern.exec(second);
    let lengths = {};
    while(words != null){
        let char = String.fromCharCode(Number(words[1]));
        let length = 1 + Number(words[2]);
        if(capitals.includes(String.fromCharCode(Number(words[1]))) && length < 21){
            lengths[char] = length;
        }
        words = secondPattern.exec(second);
    }
    message.forEach(word => {
        
        if(Object.keys(lengths).includes(word[0]) && word.length == lengths[word[0]]){
            console.log(word);
        }
    });
    
}
solve(['sdsGGasAOTPWEEEdas$AOTP$|a65:1.2s65:03d79:01ds84:02! -80:07++ABs90:1.1|adsaArmyd Gara So La Arm Armyw21 Argo O daOfa Or Ti Sar saTheww The Parahaos']);
solve(['Urgent"Message.TO$#POAML#|readData79:05:79:0!2reme80:03--23:11{79:05}tak{65:11ar}!77:!23--)77:05ACCSS76:05ad|Remedy Por Ostream :Istream Post sOffices Office Of Ankh-Morpork MR.LIPWIG Mister Lipwig'  ]);