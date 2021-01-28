function toUpperCase(param){
    const regex1 = RegExp('[A-Za-z0-9]*', 'g');
    let regRes = param.matchAll(regex1);
    let words = [];
    for (const word of regRes) {
        words.push(word[0].toUpperCase());
    }
    words = words.filter(x =>  x.length > 0);
    console.log(words.join(', '));
}
toUpperCase('Hi, how are you?')