const { expect } = require("chai");
const { assert } = require("chai");

class Repository {
    constructor(props) {
        this.props = props;
        this.data = new Map();

        let id = 0;
        this.nextId = function () {
            return id++;
        }
    }

    get count() {
        return this.data.size;
    }

    add(entity) {
        this._validate(entity);
        let id = this.nextId();
        this.data.set(id, entity);
        return id;
    }

    getId(id) {
        if (!this.data.has(id)) {
            throw new Error(`Entity with id: ${id} does not exist!`);
        }

        return this.data.get(id);
    }

    update(id, newEntity) {
        if (!this.data.has(id)) {
            throw new Error(`Entity with id: ${id} does not exist!`);
        }

        this._validate(newEntity);
        this.data.set(id, newEntity);
    }

    del(id) {
        if (!this.data.has(id)) {
            throw new Error(`Entity with id: ${id} does not exist!`);
        }

        this.data.delete(id);
    }

    _validate(entity) {
        //Validate existing property
        for (let propName in this.props) {
            if (!entity.hasOwnProperty(propName)) {
                throw new Error(`Property ${propName} is missing from the entity!`);
            }
        }

        //Validate property type
        for (let propName in entity) {
            let val = entity[propName];
            if (typeof val !== this.props[propName]) {
                throw new TypeError(`Property ${propName} is not of correct type!`);
            }
        }
    }
}

module.exports = { Repository };

// Initialize props object
let properties = {
    name: "string",
    age: "number",
    birthday: "object"
};
//Initialize the repository
let repository = new Repository(properties);
// Add two entities
let entity = {
    name: "Pesho",
    age: 22,
    birthday: new Date(1998, 0, 7)
};
repository.add(entity); // Returns 0
repository.add(entity); // Returns 1
console.log(repository.getId(0));
// {"name":"Pesho","age":22,"birthday":"1998-01-06T22:00:00.000Z"}
console.log(repository.getId(1));
// {"name":"Pesho","age":22,"birthday":"1998-01-06T22:00:00.000Z"}
//Update an entity
entity = {
    name: 'Gosho',
    age: 22,
    birthday: new Date(1998, 0, 7)
};
repository.update(1, entity);
console.log(repository.getId(1));
// {"name":"Gosho","age":22,"birthday":"1998-01-06T22:00:00.000Z"}
// Delete an entity
repository.del(0);
console.log(repository.count); // Returns 1
let anotherEntity = {
    name1: 'Stamat',
    age: 29,
    birthday: new Date(1991, 0, 21)
};
// repository.add(anotherEntity); // should throw an Error
anotherEntity = {
    name: 'Stamat',
    age: 29,
    birthday: 1991
};
// repository.add(anotherEntity); // should throw a TypeError
// repository.del(-1); // should throw Error for invalid id

describe("Tests …", function() {
    describe("instance", function() {
        let properties = {
            name: "string",
            age: "number",
            birthday: "object"
        };
        entity = {
            name: 'Gosho',
            age: 22,
            birthday: new Date(1998, 0, 7)
        };
        let anotherEntity = {
            name: 'Stamat',
            age: 29,
            birthday: new Date(1991, 0, 21)
        };
        let wrongEntity = {
            name1: 'Stamat',
            ages: 29,
            birthday: new Date(1991, 0, 22)
        };
        it("instance", function() {
            //Initialize the repository
            let repository = new Repository(properties);
            expect(new Repository().props).to.deep.equal(undefined);
            expect(repository.props).to.deep.equal(properties);
            expect(repository.props.name).to.equal('string');
            expect(repository.props.age).to.equal('number');
            expect(repository.props.birthday).to.equal('object');
            expect(repository.data).to.be.a('map');
            expect(repository.data.size).to.equal(0);
            expect(repository.nextId()).to.equal(0);
        });
        it("count", function() {
            //Initialize the repository
            let repository = new Repository(properties);
            expect(repository.count).to.equal(0);
            expect(repository.add(entity)).to.equal(0);
            expect(repository.count).to.equal(1);
            expect(repository.add(entity)).to.equal(1);
            expect(repository.count).to.equal(2);
            repository.del(1);
            expect(repository.count).to.equal(1);
        });
        it("Add", function() {
            //Initialize the repository
            let repository = new Repository(properties);
            expect(repository.add(entity)).to.equal(0);
            expect(repository.data.get(0)).to.equal(entity);
            let nextId = repository.add(entity);
            expect(repository.data.get(nextId)).to.equal(entity);

        });
        
        it("get", function() {
            //Initialize the repository
            let repository = new Repository(properties);
            expect(repository.add(entity)).to.equal(0);
            expect(repository.getId(0)).to.equal(entity);
            expect(()=>{repository.getId(1)}).to.throw(`Entity with id: 1 does not exist!`);
            expect(()=>{repository.getId(-1)}).to.throw(`Entity with id: -1 does not exist!`);
            
        });
        it("update", function() {
            //Initialize the repository
            let repository = new Repository(properties);
            expect(repository.add(entity)).to.equal(0);
            expect(()=>{repository.update(1,anotherEntity)}).to.throw(`Entity with id: 1 does not exist!`);
            repository.update(0,anotherEntity);
            expect(repository.getId(0).name).to.equal(`Stamat`);
            expect(repository.getId(0).age).to.equal(29);
            expect(repository.getId(0).birthday).to.deep.equal(new Date(1991, 0, 21));
        });
        it("Del", function() {
            //Initialize the repository
            let repository = new Repository(properties);
            expect(repository.add(entity)).to.equal(0);
            expect(()=>{repository.del(1)}).to.throw(`Entity with id: 1 does not exist!`);
            repository.del(0);
            expect(()=>{repository.getId(0)}).to.throw(`Entity with id: 0 does not exist!`);
        });
        it("validate", function() {
            //Initialize the repository
            let wrong = {
                name1: 'Stamat',
                ages: 29,
                birthday: new Date(1991, 0, 22)
            };
            let repository = new Repository(properties);
            expect(()=>{repository._validate({
                name1: 'Stamat',
                ages: 29,
                birthday: new Date(1991, 0, 22)
            })}).to.throw(`Property name is missing from the entity!`);
            expect(()=>{repository._validate({
                name: 'Stamat',
                age: '29',
                birthday: new Date(1991, 0, 22)
            })}).to.throw(`Property age is not of correct type!`);
        });
     });
});