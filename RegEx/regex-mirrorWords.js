function solve(input){
    let text = input.shift();
    // console.log(input);
    let wordPattern = /([@#])([A-Za-z]{3,})\1\1([A-Za-z]{3,})\1/g;
    let pairs = [];
    let results = [];
    let result = wordPattern.exec(text);
    while(result!= null){
        results.push(result[2]);
        results.push(result[3]);
        result = wordPattern.exec(text);
    } 
    if(results.length == 0){
        console.log("No word pairs found!");
    } else {
        console.log(results.length/2 + " word pairs found!");
    }
    //  check pairs for reverse
    for (let index = 0; index < results.length; index= index + 2) {
        const word = results[index];
        const next = results[index+1];
        if(word == reverse(next)){
            pairs.push(word+ " <=> "+next);
        }
    }
    if(pairs.length > 0){
        console.log("The mirror words are: ");
        console.log(pairs.join(", "));
    } else {
        console.log("No mirror words!");
    }

    function reverse(str){
        return str.split("").reverse().join("");
    }
}

solve([
    '@mix#tix3dj#poOl##loOp#wl@@bong&song%4very$long@thong#Part##traP##@@leveL@@Level@##car#rac##tu@pack@@ckap@#rr#sAw##wAs#r#@w1r'
  ]);
  console.log("-----");
  solve([ '#po0l##l0op# @bAc##cAB@ @LM@ML@ #xxxXxx##xxxXxx# @aba@@ababa@' ]
  );
  console.log("-----");
  solve([ '#lol#lol# @#God@@doG@# #abC@@Cba# @Xyu@#uyX#' ]
  );