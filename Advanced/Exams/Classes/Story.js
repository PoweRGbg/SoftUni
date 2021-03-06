class Story {
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = []; // {id: id, }
        this._likes = [];
        this.likes;
    }

    get likes() {
        if (this._likes.length == 0) {
            return(`${this.title} has 0 likes`);
        } else if (this._likes.length == 1) {
            return `${this._likes[0]} likes this story!`;
        } else {
            return `${this._likes[0]} and ${this._likes.length - 1} others like this story!`;
        }
    }

    like(username) {
        if (this._likes.indexOf(username) != -1) {
            this.e(`You can't like the same story twice!`);
        } else if (username == this.creator) {
            this.e("You can't like your own story!");
        } else {
            this._likes.push(username);
            return `${username} liked ${this.title}!`;
        }

    }

    dislike(username) {
        if (this._likes.indexOf(username) == -1) {
            this.e(`You can't dislike this story!`);
        } else {
            this._likes.splice(this._likes.indexOf(username), 1);
            return `${username} disliked ${this.title}`;
        }

    }
    comment(username, content, id) {
        let idExists = false;
        let commentId;
        this._comments.forEach((comment, i) =>{
            if(comment.Id == id){
                idExists = true;
                commentId = i;
            }
        });
        if(id == undefined || idExists == false){
            let newComment = {
                'Id': this._comments.length+1,
                'Username': username,
                'Content': content,
                'Replies': []
            }
            this._comments.push(newComment);
            return `${username} commented on ${this.title}`;
        } if (idExists){
            let newReply= {
                'Id': id + (this._comments[commentId].Replies.length + 1) /10,
                'Username': username,
                'Content': content
            }
            this._comments[commentId].Replies.push(newReply);
            return `You replied successfully`;
        }
    }

    toString (sortingType){
        let comments = [];
        comments.push(`Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this._likes.length}\nComments:`)
        let sortedArr = this._comments;
        if(sortingType == 'asc'){
            sortedArr.sort((a,b)=>{return a.Id - b.Id});
            sortedArr.forEach(comment => {
                if(comment.Replies.length > 0){
                    comment.Replies.sort((a,b)=>{return a.Id - b.Id});
                }    
            });
        } else if(sortingType == 'desc'){
            sortedArr.sort((a,b)=>{return  b.Id - a.Id});
            sortedArr.forEach(comment => {
                if(comment.Replies.length > 0){
                    comment.Replies.sort((a,b)=>{ b.Id - a.Id });
                }    
            });
        } else if(sortingType == 'username'){
            // sort replies also
            sortedArr.sort((a,b)=>{ return a.Username.localeCompare(b.Username)});
            sortedArr.forEach(comment => {
                if(comment.Replies.length > 0){
                    comment.Replies.sort((a,b)=>{ return a.Username.localeCompare(b.Username)});
                }    
            });
            
        }
        sortedArr.forEach(comment =>{
            comments.push(`-- ${comment.Id}. ${comment.Username}: ${comment.Content}`);
            if(comment.Replies.length > 0){
                comment.Replies.forEach(reply=>{
                    comments.push(`--- ${reply.Id}. ${reply.Username}: ${reply.Content}`);
                });
            }
        });

        return comments.join('\n');

    }

    e(message) {
        throw new Error(message);
    }
}

let art = new Story("My Story", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.like("Zane");
console.log(art.toString('desc'));
