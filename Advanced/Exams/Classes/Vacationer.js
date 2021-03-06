class Vacationer {

    constructor(name, creditCard){
        if(name.length < 3){
            this.e("Name must include first name, middle name and last name");
        }
        const nameReg = /^[A-Z][a-z]+$/;
        let valid = true;
        name.forEach(element => {
            if(valid){
                valid = nameReg.test(element);
            }            
        });

        if(!valid){
            this.e("Invalid full name")
        } 

        this.fullName ={
            firstName: name[0],
            middleName: name[1],
            lastName: name[2]
         };
        this.idNumber = this.generateIDNumber();
        if(creditCard == undefined){
            this.creditCard ={
                cardNumber:1111, 
                expirationDate:'', 
                securityNumber: 111
            };

        } else {
            this.addCreditCardInfo(creditCard);

        }
        this.wishList = [];
    }

    generateIDNumber(){
        let math = 231 * this.fullName.firstName.charCodeAt(0) + 139 * this.fullName.middleName.length;
        let femaleRegex = /[a,e,o,i,u]$/;
        let female = femaleRegex.test(this.fullName.lastName);
        if(female){
            return math + '' + 8;
        } else {
            return math + '' + 7;
        }

    }
    addCreditCardInfo(input){
        if(input.length<3){
            this.e("Missing credit card information");
        }
        if(typeof input[0] != 'number' || typeof input[2] != 'number' ){
            console.log(input[1]);
            console.log(input[2]);
            this.e("Invalid credit card details")
        }

        this.creditCard ={
            cardNumber:input[0], 
            expirationDate:input[1], 
            securityNumber: input[2]
        };
    }

    addDestinationToWishList(destination){
        if(this.wishList.indexOf(destination) != -1){
            this.e("Destination already exists in wishlist");
        }
        this.wishList.push(destination);
        this.wishList.sort((a,b)=> a.length - b.length);
    }

    getVacationerInfo(){
        return `Name: ${this.fullName.firstName} ${this.fullName.middleName} ${this.fullName.lastName}\nID Number: ${this.idNumber}\nWishlist:\n${this.wishList.length == 0?'empty':this.wishList.join(', ')}\nCredit Card:\nCard Number: ${this.creditCard.cardNumber}\nExpiration Date: ${this.creditCard.expirationDate}\nSecurity Number: ${this.creditCard.securityNumber}`;
    }

    e(message) {
        throw new Error(message);
    }
}
let vacationer1 = new Vacationer(["Tania", "Ivanova", "Zhivkov"], [123456789, "10/01/2018", 777]);
console.log(vacationer1.fullName);
console.log(vacationer1.idNumber);
vacationer1.addCreditCardInfo([1, 'a', 1]);

vacationer1.addDestinationToWishList('ab');
vacationer1.addDestinationToWishList('abca');
vacationer1.addDestinationToWishList('abc');

vacationer1.addDestinationToWishList('a');
console.log(vacationer1.wishList);
console.log(vacationer1.getVacationerInfo());
