class List {
    constructor() {
        this._list = [];
        this.size = 0;
    }

    add(element) {
        this._list.push(element);
        this.size = this._list.length;
        this._list.sort((a,b)=> a-b);
        return this;
    }

    remove(index) {
        if (index > -1 && index < this.size) {
            this._list.splice(index, 1);
            this.size = this._list.length;
            this._list.sort((a,b)=> a-b);
            return this;
        }
    }

    get(index) {
        if (index > -1 && index < this.size)
            return this._list[index];
    }
}

let list = new List();
list.add(20);
list.add(10);
list.add(5);
console.log(list.get(1));
list.remove(1);
console.log(list.get(5)); 
