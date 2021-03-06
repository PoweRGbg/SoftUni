const { expect } = require("chai");
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
  



describe('HolidayPackage', function () {
    it('instance', function () {
        let package = new PaymentPackage('a', 5);
        expect(package.name).to.equal('a');
        expect(package.value).to.equal(5);
        expect(package.VAT).to.equal(20);
        expect(package.active).to.equal(true);
    });
    
    it('setters', function () {
        let package = new PaymentPackage('a', 5);
        expect(()=>{package.name = 5}).to.throw('Name must be a non-empty string');
        expect(()=>{package.name = ''}).to.throw('Name must be a non-empty string');
        expect(()=>{new PaymentPackage(-5,-5)}).to.throw('Name must be a non-empty string');
        expect(()=>{new PaymentPackage()}).to.throw('Name must be a non-empty string');
        expect(()=>{package.value = ''}).to.throw('Value must be a non-negative number');
        expect(()=>{package.value = -5}).to.throw('Value must be a non-negative number');
        expect(()=>{new PaymentPackage('-5',-5)}).to.throw('Value must be a non-negative number');
        expect(()=>{new PaymentPackage('aaa')}).to.throw('Value must be a non-negative number');
        expect(()=>{package.VAT = -5}).to.throw('VAT must be a non-negative number');
        expect(()=>{package.VAT = ''}).to.throw('VAT must be a non-negative number');
        expect(()=>{package.active = ''}).to.throw('Active status must be a boolean');
        package.name = 'b';
        package.value = 10;
        package.VAT = 10;
        package.active = false;
        
        expect(package.name).to.equal('b');
        expect(package.value).to.equal(10);
        expect(package.VAT).to.equal(10);
        expect(package.active).to.equal(false);
    });

    it('toString', function () {
        let package = new PaymentPackage('a', 5);
        let returnedString = `Package: a\n- Value (excl. VAT): 5\n- Value (VAT 20%): 6`;
        expect(package.toString()).to.equal(returnedString);
        package.active = false;
        returnedString = `Package: a (inactive)\n- Value (excl. VAT): 5\n- Value (VAT 20%): 6`;
        expect(package.toString()).to.equal(returnedString);
    });
});
