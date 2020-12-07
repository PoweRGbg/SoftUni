function solve(input) {
    let trPattern = /[\d]/g;
    let emojiPattern = /([\*:])\1([A-Z][a-z][a-z]+)\1\1/g;
    let digits = input[0].match(trPattern);
    let threshold = 1;
    digits.forEach(x => threshold *= x);
    console.log(`Cool threshold: ${threshold}`);
    let emojis = input[0].match(emojiPattern);
    if (emojis.length > 0) {
        console.log(`${emojis.length} emojis found in the text. The cool ones are:`);
        emojis.forEach(element => {
            let emo = element.substring(2, element.length -2);
            let coolness = 0;
            for (let index = 0; index < emo.length; index++) {
                coolness += emo.charCodeAt(index);
            }
            if(coolness > threshold){
                console.log(element);
            }
        });
    }
    // console.log(input);
}

solve([
    'In the Sofia Zoo there are 311 animals in total! ::Smiley:: This includes 3 **Tigers**, 1 ::Elephant:, 12 **Monk3ys**, a **Gorilla::, 5 ::fox:es: and 21 different types of :Snak::Es::. ::Mooning:: **Shy**'
]);
// solve("----");
solve([
    '5, 4, 3, 2, 1, go! The 1-th consecutive banana-eating contest has begun! ::Joy:: **Banana** ::Wink:: **Vali** ::valid_emoji::'
]
);