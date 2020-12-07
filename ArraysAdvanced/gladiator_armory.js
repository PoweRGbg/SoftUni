function solve(input) {
    let inventory = input.shift().split(" ");
    let commands = input;

    commands.forEach(element => {
        var temp = element.split(" ");
        // console.log(inventory.join(" "));
        if (temp[0] == "Buy") {
            // Buy command, you should add the equipment at last position in the inventory, but only if it isn't bought already.
            buy(temp[1]);
        } else if (temp[0] == "Trash") {
            trash(temp[1]);
        } else if (temp[0] == "Repair") {
            // Repair command, you should repair the equipment if it exists and place it on last position.
            repair(temp[1]);
        } else if (temp[0] == "Upgrade") {
            // Upgrade command, you should check if the equipment exists 
            // and insert after it the upgrade in the following format: "{equipment}:{upgrade}";
            let command = temp[1].split("-");
            let item = command[0];
            let upgrade = command[1];
            if (contains(item) >= 0) {
                inventory.splice(contains(item)+1, 0, item + ":" + upgrade);
            }
        } 
    });

    console.log(inventory.join(" "));

    function contains(item) {
        // contains <element> – prints the index of the first occurrence of the specified element (if exists) in the array 
        // or -1 if the element is not found.
        for (let index = 0; index < inventory.length; index++) {
            const element = inventory[index];
            if (element == item) {
                return index;
            }
        }
        return -1;
    }

    function buy(item) {
        if (contains(item) < 0) {
            inventory.push(item);
        }
    }

    function trash(item) {
        //Trash command, delete the equipment if it exists.
        if (contains(item) >= 0) {
            inventory.splice(contains(item),1);
        }
    }

    function repair(item) {
        if (contains(item) >= 0) {
            trash(item);
            buy(item);
        }
    }
}

solve(['SWORD Shield Spear',
'Trash Bow',
'Repair Shield',
'Upgrade Helmet-V']);