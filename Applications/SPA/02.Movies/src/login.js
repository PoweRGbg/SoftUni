import { request } from './common.js'
import { showHome } from './home.js';

let main;
let section;
export function setupLogin(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showLogin() {
    main.innerHTML = '';
    main.appendChild(section);

    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const loginForm = new FormData(form);
        const email = loginForm.get('email');
        const password = loginForm.get('password');
        if (email == '' || password == '') {
            alert('All fields are required!');
            return;
        } else {
            let data = { email, password };
            let result = await loginUser(data);
            // update nav
            [...document.querySelectorAll('nav .user')].forEach(item =>item.style.display = 'block');
            [...document.querySelectorAll('nav .guest')].forEach(item =>item.style.display = 'none');
            document.querySelector('.nav-link').innerText = `Welcome, ${sessionStorage.getItem('email')}`;
            showHome();
        }

    });
}

async function loginUser(data) {
    const result = await request('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    sessionStorage.setItem('userToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('email', result.email);
    return result;
}


