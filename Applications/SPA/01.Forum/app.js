// get form
let form = document.querySelector('.container form');
let cancelBtn = document.querySelector('.container form .cancel');
cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(event.target.className);
    if (event.target.className == 'cancel') {
        clearFields();
        return;
    }
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let former = document.querySelector('.container form');
    let formData = new FormData(former);
    let topicName = formData.get('topicName');
    let username = formData.get('username');
    let postText = formData.get('postText');
    let date = new Date();
    let subscribes = '0';
    let post = { topicName, username, postText, date, subscribes };
    console.log(post);
    // validate fields
    let valid = true;
    Object.values(post).forEach(element => {
        if (element == '') {
            valid = false;
        }
    });
    // send request
    if (valid) {
        let result = await addPost(post);
        if (result.hasOwnProperty('_id')) {
            // clear fields
            clearFields();
            console.log(`post published`);
            let posts = await getPosts();
            console.log(posts);
            renderPosts(posts);
        } else {
            alert('Server error!');
            console.log(result);
        }
    } else {
        alert(`All fields are required!`);
    }
});
console.log();
//get buttons
function clearFields() {
    let former = document.querySelector('.container form');
    let fields = former.querySelectorAll('input');
    let textArea = former.querySelector('textarea');
    fields.forEach(field => {
        field.value = '';
    });
    textArea.value = '';
}
async function addPost(postData) {
    // const token = sessionStorage.getItem('userToken');
    const result = await request('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    // console.log(result);
    return result;
}


async function getPosts(postData) {
    // const token = sessionStorage.getItem('userToken');
    const result = await request('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'get',
    });
    // console.log(result);
    return result;
}

function renderPosts(posts) {
    let container = document.querySelector('.topic-title');
    // clear page contents
    container.innerHTML = '';
    // render all posts
    Object.keys(posts).forEach(post => {
        console.log(posts[post]);
        /*
        postText: "asd"
        topicName: "asd"
        username: "asd"
        date: date
        subscribes: number
        _id: "c8e08480-fc5a-472e-b612-484a728d54a5"
        */
        let postHTML = `                <div class="topic-container">
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <a href="#" class="normal">
                    <h2>${posts[post].topicName}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${posts[post].date}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${posts[post].username}</span></p>
                        </div>
                    </div>
                    <div class="subscribers">
                        <!-- <button class="subscribe">Subscribe</button> -->
                        <p>Subscribers: <span>${posts[post].subscribes}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        container.innerHTML += postHTML;
    });
}
async function request(url, options) {
    const response = await fetch(url, options);
    if (response.ok == false) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await response.json();
    return data;
}

