import { request } from './common.js'
import { showDetails } from './details.js';
let main;
let section;
let container;
export function setupHome(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    container = section.querySelector('.card-deck');
}

export async function showHome() {
    main.innerHTML = '';
    main.innerHTML = '';
    container.innerHTML = 'Loading ...';
    main.appendChild(section);
    let addMovieBtn = document.querySelector('.btn.btn-warning');
    if(sessionStorage.getItem('userId') == null){
        addMovieBtn.style.display = 'none';
    } else {
        addMovieBtn.style.display = '';
    }
    const movies = await getMovies();
    const cards = movies.map(createMoviePreview);

    let fragment = document.createDocumentFragment();
    cards.forEach(card => fragment.appendChild(card));
    container.innerHTML = '';
    container.appendChild(fragment);
    container.addEventListener('click', async (event) => {
        event.preventDefault();
        if (event.target.classList.contains('movieDetailsLink')) {
            await showDetails(event.target['id']);
        }
    });
}

async function getMovies() {
    let result = await request('http://localhost:3030/data/movies');
    return result;
}

function createMoviePreview(movie) {
    let element = document.createElement('div');
    element.className = 'card mb-4';
    element.innerHTML = `<img class="card-img-top"
                            src="${movie.img}"
                            alt="Card image cap" width="400">
                        <div class="card-body">
                            <h4 class="card-title">${movie.title}</h4>
                        </div>
                        <div class="card-footer">
                                <button id="${movie._id}" type="button" class="btn btn-info movieDetailsLink">Details</button>
                        </div>`;
    return element;

}