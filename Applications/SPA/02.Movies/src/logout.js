import { request, e } from './common.js'
import { showHome } from './home.js';

let main;
let section;
export function setupLogout(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showLogout() {
    const token = sessionStorage.getItem('userToken');
    const userId = sessionStorage.getItem('userId');
    const email = sessionStorage.getItem('email');
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: { 'X-Authorization': token }
    });
    if(response.ok){
        sessionStorage.clear();
        [...document.querySelectorAll('nav .user')].forEach(item => item.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(item => item.style.display = 'block');
        document.querySelector('.btn.btn-warning').style.display = 'none';
        showHome();
    }
}