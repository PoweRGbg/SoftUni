function solve(input) {
    let pieces = {};
    let actions = {
        
        Add(pieces, name, composer, key) {
            if(pieces[name] != undefined){
                console.log(`${name} is already in the collection!`);
            } else {
                pieces[name] = {
                    'composer': composer,
                    'key': key
                }
                console.log(`${name} by ${composer} in ${key} added to the collection!`);
                
            }
        },
        Remove(pieces, name) {
            if(pieces[name] != undefined){
                delete pieces[name];
                console.log(`Successfully removed ${name}!`);
            } else {
                console.log(`Invalid operation! ${name} does not exist in the collection.`);
            }

        },
        ChangeKey(pieces, name, key) {
            if(pieces[name] != undefined){
                pieces[name]['key'] = key;
                console.log(`Changed the key of ${name} to ${key}!`);
            } else {
                console.log(`Invalid operation! ${name} does not exist in the collection.`);
            }

        }
    }

    let numberOfpieces = Number(input.shift());
    for (let index = 0; index < numberOfpieces; index++) {
        let [piece, composer, key] = input.shift().split("|");
            pieces[piece] = {
                'composer': composer,
                'key': key
        }

    }
    
    let line;
    while ((line = input.shift()) != "Stop") {
            let [command, heroName, ...params] = line.split("|");
            actions[command](pieces, heroName, ...params);
        }
        
    let sorted = Object.entries(pieces);
    sorted.sort(compare);
    sorted.forEach(piece => {
        console.log(`${piece[0]} -> Composer: ${piece[1][`composer`]}, Key: ${piece[1][`key`]}`);
    });

    function compare(a, b){
        return b[1].HP - a[1].HP || a[0].localeCompare(b[0]);
    }

}
solve([
    '3',
    'Fur Elise|Beethoven|A Minor',
    'Moonlight Sonata|Beethoven|C# Minor',
    'Clair de Lune|Debussy|C# Minor',
    'Add|Sonata No.2|Chopin|B Minor',
    'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
    'Add|Fur Elise|Beethoven|C# Minor',
    'Remove|Clair de Lune',
    'ChangeKey|Moonlight Sonata|C# Major',
    'Stop'
  ] );
  console.log("-----");
  solve([
    '4',
    'Eine kleine Nachtmusik|Mozart|G Major',
    'La Campanella|Liszt|G# Minor',
    'The Marriage of Figaro|Mozart|G Major',
    'Hungarian Dance No.5|Brahms|G Minor',
    'Add|Spring|Vivaldi|E Major',
    'Remove|The Marriage of Figaro',
    'Remove|Turkish March',
    'ChangeKey|Spring|C Major',
    'Add|Nocturne|Chopin|C# Minor',
    'Stop'
  ]);
  