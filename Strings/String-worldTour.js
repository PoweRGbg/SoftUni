function solve(input) {
    let actions = {
        "Add Stop"(stops, start, stop){
            // Add Stop:{index}:{string} – insert the given string at that index only if the index is valid
            start = Number(start);
            if(start >=0 && start < stops.length){
                    stops = stops.substring(0, start)+ stop + stops.substring(start);
            }
            return stops;
        },
        "Remove Stop"(stops, start, end){
            // Remove Stop:{start_index}:{end_index} – remove the elements of the string from the starting index to the end index (inclusive) if both indices are valid
            start = Number(start);
            end = Number(end);
            if(start >=0 && start < stops.length && end >=0 && end < stops.length){
                    stops = stops.substring(0, start) + stops.substring(end+1);
            }
            return stops;
        },
        Switch(stops, substring, substitute){
            let firststart = stops.indexOf(substring);
            if(firststart == -1){
                return stops;
            } 

            while(firststart > -1){
                stops = stops.replace(substring, substitute);
                firststart = stops.indexOf(substring);
            }
            return stops;
        }
    }
    // console.log(input);
    let stops = input.shift();
    let line;
    while ((line = input.shift()) != "Travel") {
        if(line!= undefined){
            let [command, ...params] = line.split(":");
            stops = actions[command](stops, ...params);
            console.log(stops);
        }
    }

    console.log(`Ready for world tour! Planned stops: ${stops}`);

}
solve(['Hawai::Cyprys-Greece',
    'Add Stop:7:Rome',
    'Remove Stop:11:16',
    'Switch:Hawai:Bulgaria',
    'Travel']
);
console.log("----");
