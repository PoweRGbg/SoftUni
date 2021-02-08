function validate() {
    const userRegex = /^[A-Za-z0-9]{3,20}$/;
    const passRegex = /^\w{5,15}$/;
    const mailRegex = /^.*@.*\..*$/;
    let userName = document.getElementById('username');
    let password = document.getElementById('password')
    let passConfirm = document.getElementById('confirm-password');
    let email = document.getElementById('email');
    let checkbox = document.getElementById('company');
    let companyFields = document.getElementById('companyInfo');
    let company = document.getElementById('companyNumber');
    let submit = document.getElementById('submit');
    let validDiv = document.getElementById('valid');
    let invalid = false;
    submit.addEventListener('click', () => {
        event.preventDefault();
        chechElement(userName, userRegex);
        chechElement(email, mailRegex);
        chechElement(password, passRegex);
        chechElement(passConfirm, passRegex);
        
        if (passConfirm.value != password.value) {
            invalid = true;
            passConfirm.style.borderColor = 'red';
            password.style.borderColor = 'red';
        }
        
        // check company field only if checkbox is checked
        if (checkbox.checked) {
            if (company.value < 1000 || company.value > 9999) {
                invalid = true;
                company.style.borderColor = 'red';
            } else {
                company.style.borderColor = '';
            }
        }

        // show div if all fields are valid

        if (invalid) {
            validDiv.style.display = 'none';
        } else {
            validDiv.style.display = 'block';
        }
        // back to false
        invalid = false;
    });

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            companyFields.style.display = 'block';
        } else {
            companyFields.style.display = 'none';
        }
    });

    function chechElement(element, regex) {
        if (!regex.test(element.value) || element.value == '') {
            invalid = true;
            element.style.borderColor = 'red';
        } else {
            element.style.borderColor = '';
        }
    };
}
