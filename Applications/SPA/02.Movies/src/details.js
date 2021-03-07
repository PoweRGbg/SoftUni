import { request, e } from './common.js'
import { showHome } from './home.js';
import { showEdit } from './edit.js';

let main;
let section;

export function setupDetails(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    // container = section.querySelector('.container');
}

export async function showDetails(id) {
    let movie = await getMovie(id);
    movie.likes = await getLikes(id);
    let movieCard = await createMovieCard(movie);
    main.innerHTML = '';
    section.innerHTML = '';
    section.appendChild(movieCard);
    main.appendChild(section);
    const likeBtn = section.querySelector('.btn.btn-primary');
    const deleteBtn = section.querySelector('.btn.btn-danger');
    const editBtn = section.querySelector('.btn.btn-warning');
    if (likeBtn != null)
        likeBtn.addEventListener('click', async (event) => {
            await like(id);
            event.target.style.display = 'none';
            movie.likes = await getLikes(id);
            event.target.parentNode.querySelector('.enrolled-span').textContent = `Liked ${movie.likes}`;

        });

    if (deleteBtn != null) {
        deleteBtn.addEventListener('click', async (event) => {
            await deleteMovie(id);
            showHome();
        });
    }

    if (editBtn != null) {
        editBtn.addEventListener('click', (event) => {
            event.preventDefault();
            showEdit(movie);
        });
    }
}

async function getMovie(id) {
    let result = await request('http://localhost:3030/data/movies/' + id);
    return result;
}

async function getLikes(id) {
    let result = await request(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    return result;
}

async function createMovieCard(movie) {
    const userId = sessionStorage.getItem('userId');
    let controls = e('div', { className: 'col-md-4 text-center' },
        e('h3', { className: 'my-3' }, 'Movie Description'),
        e('p', {}, movie.description)
    );
    if (userId != null) {
        if (userId == movie._ownerId) {
            controls.appendChild(e('a', { className: 'btn btn-danger', href: '#' }, 'Delete'));
            controls.appendChild(e('a', { className: 'btn btn-warning', href: '#' }, 'Edit'));
        } else {
            let liked = await alreadyLiked(movie._id);

            if (!liked) {
                controls.appendChild(e('a', { className: 'btn btn-primary', href: '#' }, 'Like'));
            }
        }
    }
    controls.appendChild(e('span', { className: 'enrolled-span' }, `Liked ${movie.likes}`));

    let element = e('div', { className: 'container' },
        e('div', { className: 'row bg-light text-dark' },
            e('h1', {}, movie.title),
            e('div', { className: 'col-md-8' }, e('img', { className: 'img-thumbnail', src: `${movie.img}`, alt: "Movie" })),
            controls
        )
    );
    // element.appendChild(controls);
    return element;

}

async function like(movieId) {
    const email = sessionStorage.getItem('email');
    const token = sessionStorage.getItem('userToken');

    if (email != null) {
        let data = { email, movieId };
        const result = await request('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'X-Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let likes = await getLikes(movieId);
    }
}

async function alreadyLiked(movieId) {
    let liked = false;
    const userId = sessionStorage.getItem('userId');
    if (userId != null) {
        const result = await request(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20&%20_ownerId=%3D%22${userId}%22`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // let likes = await JSON.parse(result);
        console.log(result);
        if (result.length > 0) {
            result.forEach(element => {
                if (element._ownerId == userId) {
                    console.log(`returning true`);
                    liked = true;
                }
            });
            return liked;
        } else {
            return false;
        }
    }
}

async function deleteMovie(id) {
    const token = sessionStorage.getItem('userToken');
    const userId = sessionStorage.getItem('userId');
    const email = sessionStorage.getItem('email');
    const result = await request('http://localhost:3030/data/movies/' + id, {
        method: 'delete',
        headers: {
            'X-Authorization': token
        },
    });

    return result;
}



