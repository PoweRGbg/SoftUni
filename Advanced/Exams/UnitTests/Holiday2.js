const { expect } = require("chai");
const { assert } = require("chai");

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


describe('Holiday', function () {
    it('instance', function () {
        let package = new HolidayPackage('a','a');
        expect(package.season).to.equal('a');
        expect(package.destination).to.equal('a');
    });

    it('addVacationer', function () {
        let package = new HolidayPackage('a','a');
        expect(()=>{package.addVacationer(1)}).to.throw("Vacationer name must be a non-empty string");
        expect(()=>{package.addVacationer(' ')}).to.throw("Vacationer name must be a non-empty string");
        expect(()=>{package.addVacationer('Peter')}).to.throw("Name must consist of first name and last name");
        package.addVacationer('Peter Jackson');
        expect(package.vacationers).to.deep.equal(['Peter Jackson']);
    });

    it('ShowVac', function () {
        let package = new HolidayPackage('a','a');
        expect(package.showVacationers()).to.equal("No vacationers are added yet");
        package.addVacationer('Peter Jackson');
        expect(package.showVacationers()).to.equal("Vacationers:\nPeter Jackson");
        package.addVacationer('Peter Jackson');
        expect(package.showVacationers()).to.equal("Vacationers:\nPeter Jackson\nPeter Jackson");
    });

    it('insurance', function () {
        let package = new HolidayPackage('a','a');
        expect(package.insuranceIncluded).to.equal(false);
        package.insuranceIncluded = true;
        expect(package.insuranceIncluded).to.equal(true);
    });

    it('GeneratePack', function () {
        let package = new HolidayPackage('a','a');
        expect(() => {package.generateHolidayPackage()}).to.throw("There must be at least 1 vacationer added");
        package.addVacationer('Peter Jackson');
        expect(package.generateHolidayPackage()).to.equal(`Holiday Package Generated\nDestination: a\nVacationers:\nPeter Jackson\nPrice: 400`);
        package = new HolidayPackage('a','Summer');
        package.addVacationer('Peter Jackson');
        package.insuranceIncluded = true;
        expect(package.generateHolidayPackage()).to.equal(`Holiday Package Generated\nDestination: a\nVacationers:\nPeter Jackson\nPrice: 700`);
    });
});