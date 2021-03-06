class BookCollection {
    // TODO: implement this class
    constructor(shelfGenre, room, shelfCapacity) {
        //room(String), shelfGenre(String), shelf(an array), shelfCapacity(Number)
        // If the room is: "livingRoom" or "bedRoom" or "closet", create the shelf’s genre, room and shelf capacity. If it is not, throw 
        if (room == 'livingRoom' || room == 'bedRoom' || room == 'closet') {
            this.room = room;
            this.shelf = [];
            this.shelfGenre = shelfGenre;
            this.shelfCapacity = shelfCapacity;
            this.shelfCondition;
        } else {
            this.e(`Cannot have book shelf in ${room}`)
        }

    }

    addBook(bookName, bookAuthor, genre) {
        let book = {
            bookName: bookName,
            bookAuthor: bookAuthor,
            genre: genre
        };
        if (this.shelf.length < this.shelfCapacity) {
        } else {
            // make space 
            this.shelf.shift();
        }
        this.shelf.push(book);
        // sort by author
        this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
    }
    throwAwayBook(bookName) {
        let foundAt = -1;
        for (let index = 0; index < this.shelf.length; index++) {
            const currBook = this.shelf[index];
            if (currBook.bookName == bookName) {
                foundAt = index;
            }
        }
        if (foundAt > -1) {
            this.shelf.splice(foundAt, 1);
        }
    }
    showBooks(genre) {
        let found = [];
        found.push(`Results for search "${genre}":`);
        for (let index = 0; index < this.shelf.length; index++) {
            const book = this.shelf[index];
            if (book.genre == genre) {
                found.push(`\uD83D\uDCD6 ${book.bookAuthor} - "${book.bookName}"`);
            }
        }
        return found.join('\n');
    }

    get shelfCondition() {
        return this.shelfCapacity - this.shelf.length;
    }

    toString() {
        if (this.shelf.length == 0) {
            return `It's an empty shelf`;
        } else {
            let found = [];
            found.push(`"${this.shelfGenre}" shelf in ${this.room} contains:`);
            for (let index = 0; index < this.shelf.length; index++) {
                const book = this.shelf[index];
                found.push(`\uD83D\uDCD6 "${book.bookName}" - ${book.bookAuthor}`);
            }
            return found.join('\n');
        }

    }

    e(message) {
        throw new Error(message);
    }
}

let bedRoom = new BookCollection('Mixed', 'bedRoom', 5);
// let bedRoom2 = new BookCollection('Mixed', 'bedRoo', 5);
bedRoom.addBook("John Adams", "David McCullough", "history");
bedRoom.addBook("The Guns of August", "Cuentos para pensar", "history");
bedRoom.addBook("Atlas of Remote Islands", "Judith Schalansky");
bedRoom.addBook("Paddle-to-the-Sea", "Holling Clancy Holling");
console.log("Shelf's capacity: " + bedRoom.shelfCondition);
console.log(bedRoom.showBooks("history"));
console.log(bedRoom.toString());
