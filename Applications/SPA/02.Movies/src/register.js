import { request } from './common.js'
import { showHome } from './home.js';

let main;
let section;
export function setupRegister( mainTarget, sectionTarget){
    main = mainTarget;
    section = sectionTarget;
}

export async function showRegister(){
    main.innerHTML = '';
    main.appendChild(section);
    main.innerHTML = '';
    main.appendChild(section);

    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const loginForm = new FormData(form);
        const email = loginForm.get('email');
        const password = loginForm.get('password');
        const repass = loginForm.get('repeatPassword');
        if (email == '' || password == '' || repass == '') {
            alert('All fields are required!');
            return;
        } else if( password != repass){
            alert('Passwords don\'t match!');
            return;
        } else if( password.length < 6){
            alert('Password needs to be longer than 6 characters!');
            return;
        } else {
            let data = { email, password, repass };
            let result = await registerUser(data);
            // update nav
            [...document.querySelectorAll('nav .user')].forEach(item =>item.style.display = 'block');
            [...document.querySelectorAll('nav .guest')].forEach(item =>item.style.display = 'none');
            document.querySelector('.nav-link').innerText = `Welcome, ${sessionStorage.getItem('email')}`;
            showHome();
        }

    });
}

async function registerUser(data){
    const result = await request('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    sessionStorage.setItem('userToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('email', result.email);

    return result;
}
