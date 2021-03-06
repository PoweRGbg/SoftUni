const { expect } = require("chai");
class ChristmasMovies {
    constructor() {
        this.movieCollection = [];
        this.watched = {};
        this.actors = [];
    }

    buyMovie(movieName, actors) {
        let movie = this.movieCollection.find(m => movieName === m.name);
        let uniqueActors = new Set(actors);

        if (movie === undefined) {
            this.movieCollection.push({ name: movieName, actors: [...uniqueActors] });
            let output = [];
            [...uniqueActors].map(actor => output.push(actor));
            return `You just got ${movieName} to your collection in which ${output.join(', ')} are taking part!`;
        } else {
            throw new Error(`You already own ${movieName} in your collection!`);
        }
    }

    discardMovie(movieName) {
        let filtered = this.movieCollection.filter(x => x.name === movieName)

        if (filtered.length === 0) {
            throw new Error(`${movieName} is not at your collection!`);
        }
        let index = this.movieCollection.findIndex(m => m.name === movieName);
        this.movieCollection.splice(index, 1);
        let { name, _ } = filtered[0];
        if (this.watched.hasOwnProperty(name)) {
            delete this.watched[name];
            return `You just threw away ${name}!`;
        } else {
            throw new Error(`${movieName} is not watched!`);
        }

    }

    watchMovie(movieName) {
        let movie = this.movieCollection.find(m => movieName === m.name);
        if (movie) {
            if (!this.watched.hasOwnProperty(movie.name)) {
                this.watched[movie.name] = 1;
            } else {
                this.watched[movie.name]++;
            }
        } else {
            throw new Error('No such movie in your collection!');
        }
    }

    favouriteMovie() {
        let favourite = Object.entries(this.watched).sort((a, b) => b[1] - a[1]);
        if (favourite.length > 0) {
            return `Your favourite movie is ${favourite[0][0]} and you have watched it ${favourite[0][1]} times!`;
        } else {
            throw new Error('You have not watched a movie yet this year!');
        }
    }

    mostStarredActor() {
        let mostStarred = {};
        if (this.movieCollection.length > 0) {
            this.movieCollection.forEach(el => {
                let { _, actors } = el;
                actors.forEach(actor => {
                    if (mostStarred.hasOwnProperty(actor)) {
                        mostStarred[actor]++;
                    } else {
                        mostStarred[actor] = 1;
                    }
                })
            });
            let theActor = Object.entries(mostStarred).sort((a, b) => b[1] - a[1]);
            return `The most starred actor is ${theActor[0][0]} and starred in ${theActor[0][1]} movies!`;
        } else {
            throw new Error('You have not watched a movie yet this year!')
        }
    }
}

let christmas = new ChristmasMovies();
christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);
christmas.buyMovie('Home Alone 2', ['Macaulay Culkin']);
christmas.buyMovie('Last Christmas', ['Emilia Clarke', 'Henry Golding']);
christmas.buyMovie('The Grinch', ['Benedict Cumberbatch', 'Pharrell Williams']);
christmas.watchMovie('Home Alone');
christmas.watchMovie('Home Alone');
christmas.watchMovie('Home Alone');
christmas.watchMovie('Home Alone 2');
christmas.watchMovie('The Grinch');
christmas.watchMovie('Last Christmas');
christmas.watchMovie('Home Alone 2');
christmas.watchMovie('Last Christmas');
christmas.discardMovie('The Grinch');
christmas.favouriteMovie();
christmas.mostStarredActor();

module.exports = ChristmasMovies;

describe('ChristmasMovies', function () {
    it("instance", function () {
        //Initialize the repository
        let movies = new ChristmasMovies();
        let movies2 = new ChristmasMovies(2);
        expect(movies.actors).to.deep.equal([]);
        expect(movies2.actors).to.deep.equal([]);
        expect(movies.movieCollection).to.deep.equal([]);
        expect(movies2.movieCollection).to.deep.equal([]);
        expect(movies.watched).to.deep.equal({});
        expect(movies2.watched).to.deep.equal({});
    });

    it("Buy", function () {
        let christmas = new ChristmasMovies();
        expect(christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern'])).to.equal(`You just got Home Alone to your collection in which Macaulay Culkin, Joe Pesci, Daniel Stern are taking part!`);
        expect(christmas.watched).to.deep.equal({});
        expect(christmas.actors).to.deep.equal([]);
        expect(christmas.movieCollection).to.deep.equal([
            {
                "name": "Home Alone",
                "actors": [
                    "Macaulay Culkin",
                    "Joe Pesci",
                    "Daniel Stern",
                ]
            }
        ]);
        expect(() => { christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']) }).to.throw(`You already own Home Alone in your collection!`);
        christmas = new ChristmasMovies();
        let notUniqueActors = ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern', 'Daniel Stern'];
        expect(christmas.buyMovie('Home Alone40', notUniqueActors)).to.equal(`You just got Home Alone40 to your collection in which Macaulay Culkin, Joe Pesci, Daniel Stern are taking part!`);
        expect(christmas.movieCollection).to.deep.equal([
            {
                "name": "Home Alone40",
                "actors": [
                    "Macaulay Culkin",
                    "Joe Pesci",
                    "Daniel Stern",
                ]
            }
        ]);
        expect(christmas.buyMovie('Last Christmas', ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby'])).to.equal('You just got Last Christmas to your collection in which Madison Ingoldsby, Emma Thompson, Boris Isakovic are taking part!');
        expect(christmas.buyMovie('Home Alone 2', ['Macaulay Culkin'])).to.equal('You just got Home Alone 2 to your collection in which Macaulay Culkin are taking part!');
        expect(christmas.buyMovie('The Grinch', ['Benedict Cumberbatch', 'Rashida Jones'])).to.equal('You just got The Grinch to your collection in which Benedict Cumberbatch, Rashida Jones are taking part!');
        expect(christmas.buyMovie()).to.equal(`You just got undefined to your collection in which  are taking part!`);
        
    });

    it("Watch", function () {
        let christmas = new ChristmasMovies();
        let movieName = 'Home Alone';
        let actors = ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern'];
        expect(() => { christmas.watchMovie() }).to.throw('No such movie in your collection!');
        expect(() => { christmas.watchMovie(movieName) }).to.throw('No such movie in your collection!');
        christmas.buyMovie(movieName, actors);
        expect(christmas.watched[movieName]).to.equal();
        christmas.watchMovie(movieName);
        expect(christmas.watched[movieName]).to.equal(1);
        expect(christmas.watchMovie(movieName)).to.equal(undefined);
        expect(christmas.watched[movieName]).to.equal(2);
        expect(christmas.watched).to.deep.equal({ 'Home Alone': 2 });
        expect(christmas.actors).to.deep.equal([]);

    });


    it("Discard", function () {
        let christmas = new ChristmasMovies();
        let movieName = 'Home Alone';
        let actors = ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern'];
        expect(() => { christmas.discardMovie() }).to.throw(`undefined is not at your collection!`);
        expect(() => { christmas.discardMovie(movieName) }).to.throw(`${movieName} is not at your collection!`);
        christmas.buyMovie(movieName, actors);
        expect(() => { christmas.discardMovie(movieName) }).to.throw(`${movieName} is not watched!`);
        expect(christmas.movieCollection).to.deep.equal([]);
        christmas.buyMovie(movieName, actors);
        christmas.watchMovie(movieName);
        expect(christmas.discardMovie(movieName)).to.equal(`You just threw away ${movieName}!`)
        expect(christmas.movieCollection).to.deep.equal([]);
        expect(christmas.watched).to.deep.equal({})
        expect(christmas.actors).to.deep.equal([]);

    });

    it("Favourite", function () {
        let christmas = new ChristmasMovies();
        let movieName = 'Home Alone';
        let actors = ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern'];
        expect(() => { christmas.watchMovie(movieName) }).to.throw('No such movie in your collection!');
        expect(() => { christmas.favouriteMovie() }).to.throw('You have not watched a movie yet this year!');
        christmas.buyMovie(movieName, actors);
        christmas.watchMovie(movieName);
        expect(christmas.watched[movieName]).to.equal(1);
        christmas.watchMovie(movieName);
        expect(christmas.watched[movieName]).to.equal(2);
        expect(christmas.watched).to.deep.equal({ 'Home Alone': 2 });
        christmas.buyMovie('The Grinch', ['Benedict Cumberbatch', 'Rashida Jones']);
        christmas.watchMovie('The Grinch', ['Benedict Cumberbatch', 'Rashida Jones']);
        christmas.watchMovie('The Grinch', ['Benedict Cumberbatch', 'Rashida Jones']);
        christmas.watchMovie('The Grinch', ['Benedict Cumberbatch', 'Rashida Jones']);
        christmas.watchMovie('The Grinch', ['Benedict Cumberbatch', 'Rashida Jones']);
        christmas.watchMovie('The Grinch', ['Benedict Cumberbatch', 'Rashida Jones']);
        christmas.discardMovie('The Grinch');
        expect(christmas.favouriteMovie()).to.equal(`Your favourite movie is Home Alone and you have watched it 2 times!`);
        expect(christmas.actors).to.deep.equal([]);
    });

    it("MostStarred", function () {
        let christmas = new ChristmasMovies();
        expect(() => { christmas.mostStarredActor() }).to.throw('You have not watched a movie yet this year!');
        christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);
        christmas.buyMovie('Home Alone 2', ['Macaulay Culkin']);
        christmas.buyMovie('Last Christmas', ['Emilia Clarke', 'Henry Golding']);
        christmas.buyMovie('The Grinch', ['Benedict Cumberbatch', 'Pharrell Williams']);
        expect(christmas.mostStarredActor()).to.equal(`The most starred actor is Macaulay Culkin and starred in 2 movies!`);
        expect(christmas.actors).to.deep.equal([]);

    });
});