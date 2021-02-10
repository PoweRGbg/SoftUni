function solve() {

    myObj = {

        extend: function (parrentObj) {
            // get all the parrent properties
            let properties = Object.getOwnPropertyNames(parrentObj);
            // assing them to the current object
            for (let index = 0; index < properties.length; index++) {
                const property = properties[index];
                if (typeof parrentObj[properties[index]] == 'function') {
                    const thisProto = Object.getPrototypeOf(this);
                    thisProto[property] = parrentObj[properties[index]];
                } else {
                    this[property] = parrentObj[properties[index]];
                }
            }
        }
    }
    return myObj;
}

var template = {
    fight: function(target) { return `object fights with ${target}` },
    health: 100,
    mana: 50
};

let result = solve();
result.extend(template);
console.log(result.fight('Anna'));