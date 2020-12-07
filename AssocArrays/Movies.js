function solve(input1) {
    let input = input1;
    let movies = [];

    class Movie {
        constructor(name) {
            this.name = name;
        }
    }

    input.forEach(element => {
        //locate command
        let line = element.split(" ");
        let commPos = commandPos(line);
        let command = line.slice(commPos, commPos+1)[0];
        //parse movie name (param1)
        let param1 = line.slice(0,commPos).join(" ");
        // parse second param (param2)
        let param2 = line.slice(commPos+1).join(" ");

        //add date or director only if movie exists!
        if (command == "addMovie" && param2 != undefined && param2 != ""){
            movies.push(new Movie(param2));
        } else if( command == "onDate"){
            let positionInList = movietPos(param1);
            if(positionInList >= 0){
                movies[positionInList].date = param2;
            }
        } else if( command == "directedBy"){
            let positionInList = movietPos(param1);
            if(positionInList >= 0){
                movies[positionInList].director = param2;
            }
        }
        
    });

    // Print JSON for movies
    movies.forEach(element => {
        if(element.director != undefined && element.date != undefined && element.name != undefined)
        console.log(JSON.stringify(element));
    });

    function movietPos(name) {
        for (let index = 0; index < movies.length; index++) {
            const element = movies[index];
            if (element.name == name) {
                return index;
            }
        }
        return -1;
    }

    function commandPos(array){
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element == "directedBy" || element == "onDate" || element == "addMovie"){
                return index;
            }
        }
    }

}

solve([
    'addMovie Fast and Furious',
    'addMovie Godfather',
    'addMovie Batman',
    'Inception directedBy Christopher Nolan',
    'Godfather directedBy Francis Ford Coppola',
    'Godfather onDate 29.07.2018',
    'Fast and Furious onDate 30.07.2018',
    'Batman onDate 01.08.2018',
    'Fast and Furious directedBy Rob Cohen'
    ]);