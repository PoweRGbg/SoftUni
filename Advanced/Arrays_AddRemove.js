function addRemove(commands){
    let currentValue = 1;
    let resultArr = [];
    commands.forEach(command => {
        if(command == 'add'){
            resultArr.push(currentValue);
            currentValue +=1;
        } else if( command == 'remove'){
            resultArr.pop();
            currentValue +=1;
        }
    });

    if (resultArr.length == 0){
        console.log('Empty');
    } else {
        console.log(resultArr.join('\n'));
    }
}

addRemove(['add', 
'add', 
'add', 
'add']);
addRemove(['add', 
'add', 
'remove', 
'add', 
'add']);
addRemove(['remove', 
'remove', 
'remove']);