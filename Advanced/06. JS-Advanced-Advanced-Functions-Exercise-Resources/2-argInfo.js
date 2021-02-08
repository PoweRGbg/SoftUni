function argInfo(...args){
    let types ={};
    args.forEach(arg => {
        if(types[typeof arg] == undefined){
            types[typeof arg] = 0;
        }
        types[typeof arg] += 1;
        console.log(`${typeof arg}: ${arg}`);
    });
    const keys = Object.keys(types);
    const entries = Object.entries(types).sort(function(a, b) {
        a = a[1];
        b = b[1];
    
        return a > b ? -1 : (a < b ? 1 : 0);
    });
    entries.forEach(e =>{
        console.log(`${e[0]} = ${e[1]}`);
    });
}

argInfo({ name: 'bob'}, 3.333, 9.999, undefined);