class PaymentPackage {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.VAT = 20;      // Default value    
        this.active = true; // Default value
    }

    get name() {
        return this._name;
    }

    set name(newValue) {
        if (typeof newValue !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        if (newValue.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        this._name = newValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('Value must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('Value must be a non-negative number');
        }
        this._value = newValue;
    }

    get VAT() {
        return this._VAT;
    }

    set VAT(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('VAT must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('VAT must be a non-negative number');
        }
        this._VAT = newValue;
    }

    get active() {
        return this._active;
    }

    set active(newValue) {
        if (typeof newValue !== 'boolean') {
            throw new Error('Active status must be a boolean');
        }
        this._active = newValue;
    }

    toString() {
        const output = [
            `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${this.value}`,
            `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
        ];
        return output.join('\n');
    }
}
const { expect } = require("chai");

describe('Class', function () {
    let package = new PaymentPackage('Consultation', 800);
    it('Wrong', function () {

        expect(() => { new PaymentPackage('Some wrong package') }).to.throw();
        expect(() => { new PaymentPackage(0, 10) }).to.throw();
        expect(() => { new PaymentPackage('', 5) }).to.throw();
        expect(() => { new PaymentPackage('', '5') }).to.throw();
        expect(() => { new PaymentPackage('Wrong value', -10) }).to.throw();
    });

    package = new PaymentPackage('Consultation', 800);
    it('Initial', function () {
        expect(package._name).to.equal('Consultation');
        expect(package._value).to.equal(800);
        expect(package._active).to.equal(true);
        expect(package._VAT).to.equal(20);
    });



    it('Name', function () {
        package = new PaymentPackage('Consultation', 800);
        expect(package.name).to.equal('Consultation');
        package.name = 'Pesho';
        expect(package.name).to.equal('Pesho');
        expect(() => { package.name = '' }).to.throw('Name must be a non-empty string');
        expect(() => { package.name = 0 }).to.throw('Name must be a non-empty string');
    });
    it('Value', function () {
        package = new PaymentPackage('Consultation', 800);
        expect(package.value).to.equal(800);
        package.value = 0;
        expect(package.value).to.equal(0);
        expect(() => { package.value = '' }).to.throw('Value must be a non-negative number');
        expect(() => { package.value = -5 }).to.throw('Value must be a non-negative number');
        
    });
    it('VAT', function () {
        package = new PaymentPackage('Consultation', 800);
        expect(package.VAT).to.equal(20);
        package.VAT = 0
        expect(package.VAT).to.equal(0);
        expect(() => { package.VAT = '' }).to.throw('VAT must be a non-negative number');
        expect(() => { package.VAT = -5 }).to.throw('VAT must be a non-negative number');
        
    });
    it('Active', function () {
        package = new PaymentPackage('Consultation', 800);
        expect(package.active).to.equal(true);
        package.active = false;
        expect(package.active).to.equal(false);
        expect(() => { package.active = '' }).to.throw('Active status must be a boolean');

    });
    it('toString()', function () {
        const newPackage = new PaymentPackage('Consultation', 800);
        expect(newPackage.toString()).to.equal(`Package: Consultation\n- Value (excl. VAT): 800\n- Value (VAT 20%): 960`);
        newPackage.active = false;
        expect(newPackage.toString()).to.equal(`Package: Consultation (inactive)\n- Value (excl. VAT): 800\n- Value (VAT 20%): 960`);
    });
});