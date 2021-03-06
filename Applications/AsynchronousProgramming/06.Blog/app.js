async function attachEvents() {
    const btnLoad = document.getElementById('btnLoadPosts');
    const btnView = document.getElementById('btnViewPost');
    // disable View until we have something in the list
    btnView.disabled = true;
    btnLoad.addEventListener('click', getPosts);
    btnView.addEventListener('click', loadPost);

}

async function getPosts(event) {
    try {

        const url = `http://localhost:3030/jsonstore/blog/posts`;
        let response = await fetch(url);
        let posts = await response.json();
        let select = document.getElementById('posts');
        Object.values(posts).forEach(post =>{
            let option = e('option', {value:post.id}, post.title);
            select.appendChild(option);
        });
        document.getElementById('btnViewPost').disabled = false;
    } catch (error) {
        console.log(error);
    }
}

async function loadPost(event) {
    try {
        // get post id
        let select = document.getElementById('posts');
        const id = select.value;
        let url = `http://localhost:3030/jsonstore/blog/posts/${id}`;
        let response = await fetch(url);
        let post = await response.json();
        let title = document.getElementById('post-title');
        let body = document.getElementById('post-body');
        title.innerText = post.title;
        body.innerText = post.body;
        let ul = document.getElementById('post-comments');
        ul.innerHTML = '';
        url = `http://localhost:3030/jsonstore/blog/comments`;
        response = await fetch(url);
        let comments = await response.json();
        Object.values(comments).forEach(comment =>{
            if(comment.postId == id){
                let option = e('li', {value:post.id}, post.title);
                ul.appendChild(option);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function e(type, attributes = {}, ...content) {
    const result = document.createElement(type);

    for (let attr in attributes) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLowerCase(), attributes[attr]);
        } else {
            result[attr] = attributes[attr];
        }
    }

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}
attachEvents();