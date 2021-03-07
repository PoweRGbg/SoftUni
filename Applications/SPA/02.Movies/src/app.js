// import modules 
import { setupHome, showHome } from './home.js';
import { setupDetails, showDetails } from './details.js';
import { setupLogin, showLogin } from './login.js';
import { setupLogout, showLogout } from './logout.js';
import { setupRegister, showRegister } from './register.js';
import { setupCreate, showCreate } from './create.js';
import { setupEdit, showEdit } from './edit.js';

const main = document.querySelector('main');
// setup modules
setupSection('home-page', setupHome);
setupSection('add-movie', setupCreate);
setupSection('edit-movie', setupEdit);
setupSection('movie-example', setupDetails);
setupSection('form-login', setupLogin);
setupSection('form-sign-up', setupRegister);
setupSection('home-page', setupLogout);

setupNavigation();

// start from home
showHome();
function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId);
    setup(main, section);
}
const links = {
    'homeLink': showHome,
    'logoutLink': showLogout,
    'loginLink': showLogin,
    'registerLink': showRegister
}

// setup navigation
function setupNavigation() {
    document.querySelector('nav').addEventListener('click', (event) => {
        if (event.target.tagName == 'A') {
            const view = links[event.target.id];
            if (typeof view == 'function') {
                view();
            }
        }

    });
    if (sessionStorage.getItem('userToken') == null) {
        [...document.querySelectorAll('nav .user')].forEach(item => item.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(item => item.style.display = 'block');
    } else {
        [...document.querySelectorAll('nav .user')].forEach(item => item.style.display = 'block');
        [...document.querySelectorAll('nav .guest')].forEach(item => item.style.display = 'none');
        document.querySelector('.nav-link').innerText = `Welcome, ${sessionStorage.getItem('email')}`;
        
    }

    document.getElementById('createLink').addEventListener('click', (event) => {
        showCreate();
    });

}
// get sections