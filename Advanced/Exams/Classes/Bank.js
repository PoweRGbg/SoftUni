class Bank {
    #bankName
    constructor(bankName) {
        this.#bankName = bankName;
        this.allCustomers = [];
        this.customers = {};
    }


    get bankName() {
        return this.#bankName;
    }

    newCustomer(customer) {
        for (const key in this.customers) {
            const element = this.customers[key];
            if(customer.firstName == element.firstName && customer.lastName == element.lastName){
                throw new Error(`${customer['firstName']} ${customer['lastName']} is already our customer!`);
            }
        }
        if (this.customers[customer['personalId']] != undefined) {
            throw new Error(`${customer['firstName']} ${customer['lastName']} is already our customer!`);
        } else {
            this.customers[customer.personalId] = customer;
            this.allCustomers.push(customer.personalId);
            return this.customers[customer['personalId']];
        }
    }

    depositMoney(personalId, amount) {
        if (this.customers[personalId] == undefined) {
            throw new Error("We have no customer with this ID!");
        } else {
            if (this.customers[personalId].totalMoney == undefined) {
                this.customers[personalId].totalMoney = 0;
                this.customers[personalId].transactions = [];
            }
            this.customers[personalId].totalMoney += amount;
            this.customers[personalId].transactions.push(`${this.customers[personalId].firstName} ${this.customers[personalId].lastName} made deposit of ${amount}$!`);
            return this.customers[personalId].totalMoney + '$';
        }
    }
    withdrawMoney(personalId, amount) {
        if (this.customers[personalId] == undefined) {
            throw new Error("We have no customer with this ID!");
        } else {
            if (this.customers[personalId].totalMoney == undefined) {
                this.customers[personalId].totalMoney = 0;
                this.customers[personalId].transactions = [];
            }
            if (this.customers[personalId].totalMoney < amount) {
                throw new Error(`${this.customers[personalId].firstName} ${this.customers[personalId].lastName} does not have enough money to withdraw that amount!`);
            }
            this.customers[personalId].totalMoney -= amount;
            this.customers[personalId].transactions.push(`${this.customers[personalId].firstName} ${this.customers[personalId].lastName} withdrew ${amount}$!`);
            return this.customers[personalId].totalMoney + '$';
        }
    }

    customerInfo(personalId) {
        if (this.customers[personalId] == undefined) {
            throw new Error(`We have no customer with this ID!`);
        } else {
            let result = `Bank name: ${this.bankName}`;
            result += `\nCustomer name: ${this.customers[personalId].firstName} ${this.customers[personalId].lastName}`;
            result += `\nCustomer ID: ${personalId}`;
            result += `\nTotal Money: ${this.customers[personalId].totalMoney}$`;
            result += `\nTransactions:`;
            // display transactions
            for (let index = this.customers[personalId].transactions.length; index > 0; index--) {
                const currTransaction = this.customers[personalId].transactions[index - 1];
                result += `\n${index}. ${currTransaction}`;

            }
            return result;
        }

    }
    e(message) {
        throw new Error(message);
    }
}

let bank = new Bank('SoftUni Bank');

console.log(bank.newCustomer({ firstName: 'Svetlin', lastName: 'Nakov', personalId: 6233267 }));
console.log(bank.newCustomer({ firstName: 'Mihaela', lastName: 'Mileva', personalId: 4151596 }));

bank.depositMoney(6233267, 250);
console.log(bank.depositMoney(6233267, 250));
bank.depositMoney(4151596, 555);

console.log(bank.withdrawMoney(6233267, 125));

console.log(bank.customerInfo(6233267));
