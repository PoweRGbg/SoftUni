function makeReservation() {
    let fullName = document.getElementById('fullName');
    let email = document.getElementById('email');
    let phoneNumber = document.getElementById('phoneNumber');
    let address = document.getElementById('address');
    let postalCode = document.getElementById('postalCode');
    const submit = document.getElementById('submit');
    const editBtn = document.getElementById('edit');
    const contBtn = document.getElementById('continue');
    submit.addEventListener('click', function (event) {
        event.preventDefault();
        if (fullName.value == '' || email.value == '') {
            // do nothing
        } else {
            submit.disabled = true;
            let values = [];
            values.push(fullName.value);
            values.push(email.value);
            values.push(phoneNumber.value);
            values.push(address.value);
            values.push(postalCode.value);
            let ul = document.getElementById('infoPreview');
            let nameLi = e('li', {}, 'Name: ' + fullName.value);
            let emailLi = e('li', {}, 'E-mail: ' + email.value);
            let phoneLi = e('li', {}, 'Phone: ' + phoneNumber.value);
            let addressLi = e('li', {}, 'Address: ' + address.value);
            let postalCodeLi = e('li', {}, 'Postal Code: ' + postalCode.value);
            ul.appendChild(nameLi);
            ul.appendChild(emailLi);
            ul.appendChild(phoneLi);
            ul.appendChild(addressLi);
            ul.appendChild(postalCodeLi);
            fullName.value = '';
            email.value = '';
            phoneNumber.value = '';
            address.value = '';
            postalCode.value = '';
            editBtn.disabled = false;
            contBtn.disabled = false;
            editBtn.addEventListener('click', function (delEvent) {
                fullName.value = values[0];
                email.value = values[1];
                phoneNumber.value = values[2];
                address.value = values[3];
                postalCode.value = values[4];
                editBtn.disabled = true;
                contBtn.disabled = true;
                submit.disabled = false;
                ul.innerHTML = '';
            });
            contBtn.addEventListener('click', function (event) {
                editBtn.disabled = true;
                contBtn.disabled = true;
                // ul.innerHTML = '';
                let container = document.getElementById('container');
                let h2 = e('h2', {}, 'Payment details');
                let select = e('select', { id: 'paymentOptions' });
                let extraDiv = e('div', { id: 'extraDetails' });
                select.className = 'custom-select';
                let choose = e('option', {}, 'Choose');
                choose.setAttribute('selected','')
                console.log(choose);
                choose.disabled = true;
                choose.hidden = true;
                let creditCart = e('option', { value: 'creditCard' }, 'Credit Card');
                let bankTransfer = e('option', { value: 'bankTransfer' }, 'Bank Transfer');
                select.appendChild(choose);
                select.appendChild(creditCart);
                select.appendChild(bankTransfer);
                select.addEventListener('change', function (event) {
                    // div extra details
                    let checkOut = e('button', { id: 'checkOut' }, 'Check Out');
                    if (event.target.value == 'creditCard') {
                        let ccNumber = e('div', { class: 'inputLabel' }, 'Card Number');
                        ccNumber.className = 'inputLabel';
                        let ccExpiration = e('div', { class: 'inputLabel' }, 'Expiration Date');
                        ccExpiration.className = 'inputLabel';
                        let ccSec = e('div', { class: 'inputLabel' }, 'Security Number');
                        ccSec.className = 'inputLabel';
                        ccNumber.appendChild(e('input'));
                        extraDiv.appendChild(ccNumber);
                        extraDiv.appendChild(e('br'));
                        ccExpiration.appendChild(e('input'));
                        extraDiv.appendChild(ccExpiration);
                        extraDiv.appendChild(e('br'));
                        ccSec.appendChild(e('input'));
                        extraDiv.appendChild(ccSec);
                        extraDiv.appendChild(e('br'));
                        extraDiv.appendChild(checkOut);

                        
                    } else {
                        let par = e('p',{});
                        par.innerHTML = 'You have 48 hours to transfer the amount to:<BR>IBAN: GR96 0810 0010 0000 0123 4567 890';
                        extraDiv.appendChild(par);
                        extraDiv.appendChild(checkOut);
                    }
                    event.target.parentNode.appendChild(extraDiv);
                    checkOut.addEventListener('click', function (event) {
                        let thanks = e('h4', {}, 'Thank you for your reservation!');
                        let wrapper = document.getElementById('wrapper');
                        wrapper.innerHTML = '';
                        wrapper.appendChild(thanks);
                    });
                });

                container.appendChild(h2);
                container.appendChild(select);
                container.appendChild(extraDiv);
                



            });

        }
    });

    function e(type, attributes = {}, ...content) {
        const result = document.createElement(type);

        for (let attr in attributes) {
            if (attr.substring(0, 2) == 'on') {
                result.addEventListener(attr.substring(2).toLowerCase(), attributes[attr]);
            } else {
                result[attr] = attributes[attr];
            }
        }

        content.forEach(e => {
            if (typeof e == 'string' || typeof e == 'number') {
                const node = document.createTextNode(e);
                result.appendChild(node);
            } else {
                result.appendChild(e);
            }
        });

        return result;
    }
}