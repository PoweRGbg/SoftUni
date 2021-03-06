class VeterinaryClinic {
    // TODO: implement this class...
    constructor(clinicName, capacity) {
        this.clinicName = clinicName;
        this.capacity = capacity;
        this.clients = [];
        this.totalProfit = 0;
        this.currentWorkload = {};
        this.filled = 0;
    }

    newCustomer(ownerName, petName, kind, procedures) {
        // one owner may have more than one pets under his name
        //petName –  string that keeps the name of the current pet, once stored this information stays in the clinic data, even when the pet is healed.
        //kind – string that keeps the current pet kind, be careful of upper cases into the input string. Once stored this information stays in the clinic data, even when the pet is healed.

        if (this.filled >= this.capacity) {
            this.e('Sorry, we are not able to accept more patients!');
        } else {
            // check if client is registered and has pet has procedures
            if (this.clients.hasOwnProperty(ownerName) == false) {
                this.clients[ownerName] = {};
            }
            if (this.clients[ownerName][petName] == undefined) {
                this.clients[ownerName][petName] = {}
            }
            if (this.clients[ownerName][petName].procedures == undefined || this.clients[ownerName][petName].procedures.length == 0) {
                this.clients[ownerName][petName].kind = kind.toLowerCase();
                this.clients[ownerName][petName].ownner = ownerName;
                this.clients[ownerName][petName].procedures = procedures;
                this.currentWorkload[petName] = procedures;
                this.filled +=1;
                return `Welcome ${petName}!`;

            } else {
                e(`This pet is already registered under ${ownerName} name! ${petName} is on our lists, waiting for ${this.currentWorkload[petName].join(', ')}.`);
            }
        }

    }

    onLeaving(ownerName, petName) {
        if (this.clients.hasOwnProperty(ownerName) != false) {
            if (this.clients[ownerName].hasOwnProperty(petName) && this.clients[ownerName][petName].procedures.length == 0) {
                this.e(`Sorry, there are no procedures for ${petName}!`)
            } else {
                // increase profit
                this.totalProfit += this.clients[ownerName][petName].procedures.length * 500;
                this.clients[ownerName][petName].procedures = [];
                this.filled -= 1;
                return `Goodbye ${petName}. Stay safe!`;
            }
        } else {
            this.e("Sorry, there is no such client!")
        }

    }
    toString() {
        let result = '';
        let clients = Object.keys(this.clients).sort();
        let clientStrings = [];
        for (let index = 0; index < clients.length; index++) {
            const client = clients[index];
            // every pet
            let petStrings = [];
            let pets = Object.keys(this.clients[client]).sort();
            for (let i = 0; i < pets.length; i++) {
                const pet = pets[i];
                petStrings.push(`---${pet} - a ${this.clients[client][pet].kind.toLowerCase()} that needs: ${(this.clients[client][pet].procedures.length > 0?this.clients[client][pet].procedures.join(', '):'')}`);
            }
            clientStrings.push(`${client} with:\n${petStrings.join('\n')}`);


        }
        let busy = (this.filled / this.capacity);
        result = `${this.clinicName} is ${(Math.floor((this.filled / this.capacity) * 100))}% busy today!\n`;
        result += clientStrings.join('\n');
        return result;
    }

    e(message) {
        throw new Error(message);
    }
}

let clinic = new VeterinaryClinic('SoftCare', 10);
console.log(clinic.newCustomer('Jim Jones', 'Tom', 'Cat', ['A154B', '2C32B', '12CDB']));
console.log(clinic.newCustomer('Anna Morgan', 'Max', 'Dog', ['SK456', 'DFG45', 'KS456']));
console.log(clinic.newCustomer('Jim Jones', 'Tiny', 'Cat', ['A154B'])); 
console.log(clinic.onLeaving('Jim Jones', 'Tiny'));
console.log(clinic.toString());
clinic.newCustomer('Jim Jones', 'Sara', 'Dog', ['A154B']); 
console.log(clinic.toString());

