const getUrl = 'http://localhost:3030/jsonstore/phonebook';
function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', async ()=>{
        await getEntries();
    });
    document.getElementById('btnCreate').addEventListener('click', async () => {
        let person = document.getElementById('person').value;
        let phone = document.getElementById('phone').value;
        if (person != '' && phone != '') {
            let data = { person, phone };
            let result = await addEntry(data);
            if(result != undefined){
                console.log(result);
                document.getElementById('person').value = '';
                document.getElementById('phone').value = '';
            }
        } else {
            console.log(`Required field is empty`);
        }
    });
    document.getElementById('phonebook').addEventListener(`click`, async (event) =>{
        if(event.target.className = 'button'){
            console.log('Delete click');
            let result = await deleteEntry(event.target.value);
            console.log(result);
        }
    });
}

async function getEntries() {
    let phonebook = document.getElementById('phonebook');
    phonebook.innerHTML = '';
    let entries = await request(getUrl);
    Object.entries(entries).forEach(element => {
        const person = element[1].person;
        const phone = element[1].phone;
        let li = e('li', {}, `${person}: ${phone} `, e('button', {'value': element[0]}, 'Delete'));
        phonebook.appendChild(li);
    });

}

async function request(url, options) {
    console.log(`Request options: ${options}`);
    const response = await fetch(url, options);
    if (response.ok == false) {
        const error = await response.json();
        alert(error.phone);
        throw new Error(error.phone);
    }
    const data = await response.json();
    return data;
}

async function deleteEntry(id) {
    console.log('deleting ' + id);
    let result = await request('http://localhost:3030/jsonstore/phonebook/' + id, {
        method: 'DELETE'
    });
    return result;
}

async function addEntry(data) {
    console.log(` adding ${JSON.stringify(data)}`);
    let result = await request(getUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return result;
}


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

attachEvents();