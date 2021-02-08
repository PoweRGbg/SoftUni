class Ticket{
    constructor (destination, price, status){
        this.destination = destination;
        this.price = price;
        this.status = status;
    }
}

function tickets( ticketsInput, sortCriteria){
    let tickets = [];
    ticketsInput.forEach(element => {
        let ticket = new Ticket(ticketsInput[0], ticketsInput[1], ticketsInput[2]);
        tickets.push(ticket);
    });
    console.log(tickets);
}

tickets(['Philadelphia|94.20|available',
'New York City|95.99|available',
'New York City|95.99|sold',
'Boston|126.20|departed'],
'destination');