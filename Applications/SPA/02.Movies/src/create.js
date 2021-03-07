import { request, e } from './common.js'
import { showHome } from './home.js';

let main;
let section;
export function setupCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showCreate() {
    main.innerHTML = '';
    main.appendChild(section);

    const form = section.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        if(title == '' || description == "" || imageUrl == ''){
            alert('All fields are required!');
            return;
        }
        let data = { title, description, 'img': imageUrl };
        let result = await addMovie(data);
        showHome();
    });
}

async function addMovie(data) {
    const token = sessionStorage.getItem('userToken');
    const userId = sessionStorage.getItem('userId');
    const email = sessionStorage.getItem('email');
    const result = await request('http://localhost:3030/data/movies', {
        method: 'post',
        headers: {
            'X-Authorization': token,
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    });

    return result;
}