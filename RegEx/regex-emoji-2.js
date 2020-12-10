function solve(input){
    let threshold = 1;
    let digRegEx = /\d/g;
    let text = input;
    let digit = digRegEx.exec(text);
    let digits = [];
    while(digit != null){
        digits.push(digit);
        digit = digRegEx.exec(text);
    }
    digits.forEach(element => {
        threshold *= Number(element);
    });
    // console.log(input);
    let wordPattern = /(::|\*\*)([A-Z][a-z]{2,})\1/g;
    let results = [];
    let found = 0;
    let result = wordPattern.exec(text);
    while(result!= null){
        let coolPoints = 0;
        found++;
        for (let index = 0; index < result[2].length; index++) {
            coolPoints += result[2].charCodeAt(index);
        }
        if(coolPoints > threshold){
            results.push(result[0]);
        }
        result = wordPattern.exec(text);
    } 
    
    console.log("Cool threshold: "+threshold);
    console.log(`${found} emojis found in the text. The cool ones are:`);
    
    results.forEach(element => {
        console.log(element);
        
    });
}
solve("In the Sofia Zoo there are 311 animals in total! ::Smiley:: This includes 3 **Tigers**, 1 ::Elephant:, 12 **Monk3ys**, a **Gorilla::, 5 ::fox:es: and 21 different types of :Snak::Es::. ::Mooning:: **Shy**");
console.log(" ---- ");
solve("5, 4, 3, 2, 1, go! The 1-th consecutive banana-eating contest has begun! ::Joy:: **Banana** ::Wink:: **Vali** ::valid_emoji::");
console.log(" ---- ");
solve("It is a long established fact that 1 a reader will be distracted by 9 the readable content of a page when looking at its layout. The point of using ::LoremIpsum:: is that it has a more-or-less normal 3 distribution of 8 letters, as opposed to using 'Content here, content 99 here', making it look like readable **English**.")
