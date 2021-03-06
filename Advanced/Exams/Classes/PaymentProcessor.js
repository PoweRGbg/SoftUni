class PaymentProcessor {
    constructor(optionalObj) {
        this.setOptions(optionalObj);
        this.payments = {};
    };

    registerPayment(id, name, type, value) {
        if (id != '' && this.payments[id] == undefined && name != '' && this.types.indexOf(type) != -1 && typeof value == 'number') {
            this.payments[id] = { 'name': name, 'type': type, 'value': Number(value.toFixed(this.precision)) };
        } else {
            this.e('invalid type');
        }
    };

    deletePayment(id) {
        if (this.payments[id] == undefined)
            this.e('ID not found');
        delete this.payments[id];
    };

    get(id) {
        if (this.payments[id] == undefined)
            this.e('ID not found');

        return `Details about payment ID: ${id}\n- Name: ${this.payments[id].name}\n- Type: ${this.payments[id].type}\n- Value: ${this.payments[id].value.toFixed(this.precision)}`;

    };

    toString() {
        let total = 0;
        let keys = Object.keys(this.payments);
        keys.forEach(element => {

            total += this.payments[element].value;
        });
        return `Summary:\n- Payments: ${Object.keys(this.payments).length}\n- Balance: ${total.toFixed(this.precision)}`;
    }

    setOptions(optionalObj) {
        this.types = ["service", "product", "other"];
        this.precision = 2;
        if (optionalObj != undefined) {
            if (optionalObj.types != undefined) {
                this.types = optionalObj.types;
            }
            if (optionalObj.precision) {
                this.precision = optionalObj.precision;
            }
        };

    }

    e(message) {
        throw new Error(message);
    };

}
// Initialize processor with default options
const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.toString());

// Should throw an error (invalid type)
// generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);

generalPayments.setOptions({ types: ['product', 'material'] });
generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
console.log(generalPayments.get('E028'));
generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);

// Should throw an error (ID not found)
// generalPayments.deletePayment('E027');
// Should throw an error (ID not found)
// generalPayments.get('E027');

generalPayments.deletePayment('E028');
console.log(generalPayments.toString());

// Initialize processor with custom types
const servicePyaments = new PaymentProcessor({ types: ['service'] });
servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
console.log(servicePyaments.toString());

// Initialize processor with custom precision
const transactionLog = new PaymentProcessor({ precision: 5 });
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.toString());
