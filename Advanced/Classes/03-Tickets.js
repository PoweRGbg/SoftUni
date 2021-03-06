function solve( input, criteria){
    class Ticket{
        constructor (destination, price, status){
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }

    // create array with tickets 
    let tickets = [];
    for (const ticketIn of input) {
        let ticket = ticketIn.split('|');
        let ticketObj = new Ticket(ticket[0], ticket[1], ticket[2]);
        tickets.push(ticketObj);
    }
    // sort it
    if(criteria == 'destination'){
        tickets.sort((a,b) => a.destination.localeCompare(b.destination));
        // tickets.sort();
    } 
    if(criteria == 'status'){
        tickets.sort((a,b) => a.status.localeCompare(b.status));
        // tickets.sort();
    }
    if(criteria == 'price'){
        tickets.sort((a,b) => a.price - b.price);
        // tickets.sort();
    }
    // return it
    return tickets;
}

solve(['Philadelphia|94.20|available',
'New York City|95.99|available',
'New York City|95.99|sold',
'Boston|126.20|departed'],
'price');