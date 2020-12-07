function solve(input){
    let text = input;
    // console.log(input);
    let wordPattern = /([\=|\/])([A-Z][a-z]{2,})\1/g;
    let results = [];
    let travel_points = 0;
    let result = wordPattern.exec(text);
    while(result!= null){
        results.push(result[2]);
        travel_points += result[2].length
        result = wordPattern.exec(text);
    } 
    
    console.log("Destinations: "+results.join(", "));
    console.log(`Travel Points: ${travel_points}`);

}
solve("=Hawai=/Cyprus/=Invalid/invalid==i5valid=/I5valid/=i=");
console.log(" ---- ");
solve("ThisIs some InvalidInput");
