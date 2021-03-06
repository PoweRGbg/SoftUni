const forms = document.getElementsByClassName('col-md-12')[0];
const register = forms.getElementsByTagName('form')[0];
const login = forms.getElementsByTagName('form')[1];
console.log(register, login);

const registerBtn = register.getElementsByTagName('button')[0];

const loginBtn = login.getElementsByTagName('button')[0];
console.log(loginBtn);

registerBtn.addEventListener('click', async (event)=>{
    event.preventDefault();
    const registerForm = new FormData(register);
    const email = registerForm.get('email');
    const password = registerForm.get('password');
    const rePass = registerForm.get('rePass');
    console.log(email, password, rePass);
    if(email == '' || password == '' || rePass == ''){
        alert('All fields are required!');
        return;
    } else if(password != rePass){
        alert('Passwords don\'t match!');
        return;
    } else {
        let data = { email, password};
        let result = await registerUser(data);
        window.location.pathname = '/index.html';
    }
});

loginBtn.addEventListener('click', async (event)=>{
    event.preventDefault();
    const loginForm = new FormData(login);
    const email = loginForm.get('email');
    const password = loginForm.get('password');
    if(email == '' || password == ''){
        alert('All login fields are required!');
        return;
    } else {
        let data = { email, password};
        let result = await logUserIn(data);
        window.location.pathname = '/index.html';

    }
    console.log(`Login clicked`);
});
async function registerUser(data){
    const result = await request('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    console.log(result);
    sessionStorage.setItem('userToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    return result;
}

async function logUserIn(data){
    const result = await request('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    console.log(result);
    sessionStorage.setItem('userToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    return result;
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
