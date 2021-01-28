function sortBy2(array){
    array.sort(sorter);
    console.log(array.join('\n'));
    function sorter(a,b){
        if(a.length == b.length){
            return a.localeCompare(b);
        } else 
        return a.length - b.length;
    }
}

sortBy2(['Isacc', 
'Theodor', 
'Jack', 
'Harrison', 
'George']);
// sortBy2();