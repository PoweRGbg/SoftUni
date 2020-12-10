function solve(input){
    let sum = 0;
    let participants = {};
    let name = /[A-Za-z]+/g;
    let distancePat = /[\d]/g;
    let line = input.shift();
    participantsInput = line.split(", ");
    participantsInput.forEach(element =>{
        participants[element] = 0;
    });
    line = input.shift();
    while (line != "end of race") {
        let command = line;
        let participantChar = name.exec(line);
        let distance = 0;
        let participantName = "";
        while(participantChar != null){
            participantName += participantChar;
            participantChar = name.exec(line);
        }

        let distanceRan = command.match(distancePat);
        distanceRan.forEach(element => {
            distance += Number(element);
        });

        if(participants[participantName] != undefined){
            participants[participantName] += distance;
        }
        
        line = input.shift();
    }
    let sorted = getSortedKeys(participants);
    console.log(`1st place: ${sorted[0]}`);
    console.log(`2nd place: ${sorted[1]}`);
    console.log(`3rd place: ${sorted[2]}`);
        
    function getSortedKeys(obj) {
        var keys = []; for(var key in obj) keys.push(key);
        return keys.sort(function(a,b){return obj[b]-obj[a]});
    }
    
}


solve([
  'George, Peter, Bill, Tom',
  'R1@!3a$y4456@',
  'B5@i@#123ll',
  'G@e54o$r6ge#',
  '7P%et^#e5346r',
  'T$o553m&6',
  'end of race'
]
);