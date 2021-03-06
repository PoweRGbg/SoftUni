const { expect } = require("chai");

class HolidayPackage {
    constructor(destination, season) {
        this.vacationers = [];
        this.destination = destination;
        this.season = season;
        this.insuranceIncluded = false; // Default value
    }

    showVacationers() {
        if (this.vacationers.length > 0)
            return "Vacationers:\n" + this.vacationers.join("\n");
        else
            return "No vacationers are added yet";
    }

    addVacationer(vacationerName) {
        if (typeof vacationerName !== "string" || vacationerName === ' ') {
            throw new Error("Vacationer name must be a non-empty string");
        }
        if (vacationerName.split(" ").length !== 2) {
            throw new Error("Name must consist of first name and last name");
        }
        this.vacationers.push(vacationerName);
    }

    get insuranceIncluded() {
        return this._insuranceIncluded;
    }

    set insuranceIncluded(insurance) {
        if (typeof insurance !== 'boolean') {
            throw new Error("Insurance status must be a boolean");
        }
        this._insuranceIncluded = insurance;
    }

    generateHolidayPackage() {
        if (this.vacationers.length < 1) {
            throw new Error("There must be at least 1 vacationer added");
        }
        let totalPrice = this.vacationers.length * 400;

        if (this.season === "Summer" || this.season === "Winter") {
            totalPrice += 200;
        }

        totalPrice += this.insuranceIncluded === true ? 100 : 0;

        return "Holiday Package Generated\n" +
            "Destination: " + this.destination + "\n" +
            this.showVacationers() + "\n" +
            "Price: " + totalPrice;
    }
}

describe('HolidayPackage', function () {
    it('instance', function () {
        let package = new HolidayPackage('a', 'b');
        expect(package.destination).to.equal('a');
        expect(package.vacationers).to.deep.equal([]);
        expect(package.insuranceIncluded).to.equal(false);
    });

    it('showVacationers+add', function () {
        let package = new HolidayPackage('a', 'b');
        expect(package.showVacationers()).to.equal('No vacationers are added yet');
        package.addVacationer('a b');
        expect(package.showVacationers()).to.equal("Vacationers:\n"+['a b']);
        expect(package.vacationers).to.deep.equal(['a b']);
        package.addVacationer('c d');
        expect(package.showVacationers()).to.equal("Vacationers:\n"+['a b']+'\n' +['c d']);
    });
    it('addVacationer', function () {
        let package = new HolidayPackage('a', 'b');
        package.addVacationer('a b');
        package.addVacationer('c d');
        expect(package.showVacationers()).to.equal("Vacationers:\n"+['a b']+'\n' +['c d']);
        expect(package.vacationers).to.deep.equal(['a b', 'c d']);
        expect(()=>{package.addVacationer('a')}).to.throw("Name must consist of first name and last name");
        expect(()=>{package.addVacationer('a b c')}).to.throw("Name must consist of first name and last name");
        expect(()=>{package.addVacationer(1)}).to.throw("Vacationer name must be a non-empty string");
    });

    it('insurance', function () {
        let package = new HolidayPackage('a', 'b');
        package.addVacationer('a b');
        expect(package.insuranceIncluded).to.be.equal(false);
        expect(()=>{package.insuranceIncluded= 1}).to.throw("Insurance status must be a boolean");
        package.insuranceIncluded= true;
        expect(package.insuranceIncluded).to.be.equal(true);
    });

    it('Generate', function () {
        let package = new HolidayPackage('a', 'b');
        expect(()=>{package.generateHolidayPackage()}).to.throw("There must be at least 1 vacationer added");
        package.addVacationer('a b');
        expect(package.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: a\n"+"Vacationers:\n"+['a b']+'\nPrice: 400');
        // add insurance
        package.insuranceIncluded = true;
        expect(package.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: a\n"+"Vacationers:\n"+['a b']+'\nPrice: 500');
        // summer vacation
        package = new HolidayPackage('a', 'Summer');
        package.addVacationer('a b');
        package.insuranceIncluded = true;
        expect(package.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: a\n"+"Vacationers:\n"+['a b']+'\nPrice: 700');
        // winter
        // summer vacation
        package = new HolidayPackage('a', 'Winter');
        package.addVacationer('a b');
        package.insuranceIncluded = true;
        expect(package.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: a\n"+"Vacationers:\n"+['a b']+'\nPrice: 700');
    });
});