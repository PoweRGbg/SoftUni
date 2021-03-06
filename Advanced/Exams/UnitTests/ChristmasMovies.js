describe('ChristmasMovies', function () {
    let christmas;
    beforeEach(() => {
        christmas = new ChristmasMovies();
    })
    it("instance", function () {
        //Initialize the repository
        expect(christmas.movieCollection).to.deep.equal([],1);
        expect(christmas.watched).to.deep.equal({},2);
        expect(christmas.actors).to.deep.equal([],3);

    });

    it("Buy", function () {
        expect(christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern', 'Joe Pesci']))
        .to.equal(`You just got Home Alone to your collection in which Macaulay Culkin, Joe Pesci, Daniel Stern are taking part!`);
        expect(()=>{christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern'])})
        .to.throw(`You already own Home Alone in your collection!`);

    });

    it("discard", function () {
        expect(()=>{christmas.discardMovie('Home Alone')}).to.throw(`Home Alone is not at your collection!`,1);
        christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);
        expect(()=>{christmas.discardMovie('Home Alone')}).to.throw(`Home Alone is not watched!`,2);
        expect(christmas.movieCollection).to.deep.equal([]);
        christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);
        christmas.watchMovie('Home Alone');
        expect(christmas.discardMovie('Home Alone')).to.equal(`You just threw away Home Alone!`,3);
        expect(christmas.watched).to.deep.equal({});
        expect(christmas.movieCollection).to.deep.equal([]);
    });

    it("watch", function () {
        expect(()=>{christmas.watchMovie('Home Alone')}).to.throw('No such movie in your collection!');
        christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);
        christmas.watchMovie('Home Alone');
        christmas.watchMovie('Home Alone');
        expect(christmas.watched['Home Alone']).to.equal(2);
    });

    it("favouriteMovie", function () {
        expect(()=>{christmas.favouriteMovie()}).to.throw('You have not watched a movie yet this year!');
        christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);
        christmas.buyMovie('Home Alone2', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);
        christmas.watchMovie('Home Alone');
        christmas.watchMovie('Home Alone2');
        expect(christmas.favouriteMovie()).to.equal(`Your favourite movie is Home Alone and you have watched it 1 times!`);
        christmas.watchMovie('Home Alone');
        expect(christmas.favouriteMovie()).to.equal(`Your favourite movie is Home Alone and you have watched it 2 times!`);
    });

    it("MostStarred", function () {
        expect(()=>{christmas.mostStarredActor()}).to.throw('You have not watched a movie yet this year!');
        christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);
        christmas.buyMovie('Home Alone2', ['Macaulay Culkin', 'Ivan']);
        expect(christmas.mostStarredActor()).to.equal(`The most starred actor is Macaulay Culkin and starred in 2 movies!`);
    });
});