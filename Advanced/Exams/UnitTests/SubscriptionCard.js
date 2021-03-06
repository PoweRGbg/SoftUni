const { expect } = require("chai");
class SubscriptionCard {
    constructor(firstName, lastName, SSN) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._SSN = SSN;
        this._subscriptions = [];
        this._blocked = false;
    }
    get firstName() {
        return this._firstName;
    }
    get lastName() {
        return this._lastName;
    }
    get SSN() {
        return this._SSN;
    }
    get isBlocked() {
        return this._blocked;
    }
    addSubscription(line, startDate, endDate) {
        this._subscriptions.push({
            line,
            startDate,
            endDate
        });
    }
    isValid(line, date) {
        if (this.isBlocked) return false;
        return this._subscriptions.filter(s => s.line === line || s.line === '*')
            .filter(s => {
                return s.startDate <= date &&
                    s.endDate >= date;
            }).length > 0;
    }
    block() {
        this._blocked = true;
    }
    unblock() {
        this._blocked = false;
    }
}
describe('SubscriptionCard', function () {
    it('instance', function () {
        let package = new SubscriptionCard('a', 'b', 1);
        expect(package._firstName).to.equal('a');
        expect(package._lastName).to.equal('b');
        expect(package._SSN).to.equal(1);
        expect(package._subscriptions).to.deep.equal([]);
        expect(package._blocked).to.equal(false);
    });

    it('accessors', function () {
        let package = new SubscriptionCard('a', 'b', 1);
        package.firstName = 'Ivan';
        package.lastName = 'Ivan';
        package.SSN = 'Ivan';
        expect(package.firstName).to.equal('a');
        expect(package.firstName).to.equal('a');
        expect(package.lastName).to.equal('b');
        expect(package.SSN).to.equal(1);
        expect(package.isBlocked).to.equal(false);
    });

    it('addSubscription', function () {
        let package = new SubscriptionCard('a', 'b', 1);
        let subscr = {
            "endDate": new Date('2018-05-21'),
            "line": "120",
            "startDate": new Date('2018-04-22')
        };
        package.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(package._subscriptions).to.deep.equal([subscr]);
    });

    it('block', function () {
        let package = new SubscriptionCard('a', 'b', 1);
        package.block();
        expect(package.isBlocked).to.equal(true);
        package.unblock();
        expect(package.isBlocked).to.equal(false);
    });

    it('isValid', function () {
        let package = new SubscriptionCard('a', 'b', 1);
        let subscr = {
            "endDate": new Date('2018-05-21'),
            "line": "120",
            "startDate": new Date('2018-04-22')
        };
        package.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        package.block();
        expect(package.isValid("120", new Date('2018-04-25'))).to.equal(false);
        package.unblock();
        expect(package.isValid("120", new Date('2018-04-25'))).to.equal(true);
        expect(package.isValid("120", new Date('2018-04-22'))).to.equal(true);
        expect(package.isValid("120", new Date('2018-05-21'))).to.equal(true);
        expect(package.isValid("120", new Date('2018-05-22'))).to.equal(false);
        expect(package.isValid("120", new Date('2018-05-25'))).to.equal(false);
        package.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-30'));
        expect(package.isValid("120", new Date('2018-05-25'))).to.equal(true);
    });
});