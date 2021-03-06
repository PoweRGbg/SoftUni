function attachEvents() {
    const addBtn = document.getElementById('addForm').querySelector('.add');
    const loadBtn = document.getElementsByClassName('load')[0];
    const catches = document.getElementById('catches');
    const token = sessionStorage.getItem('userToken');

    if (token != null) {
        document.getElementById('guest').style.display = 'none';
        //enable add button
        addBtn.disabled = false;
    }
    loadBtn.addEventListener('click', listAllCatches);
    addBtn.addEventListener('click', async () => {
        let myCatch = parseForm();
        myCatch._ownerId = token;
        console.log(myCatch);
        // validate input
        if(isValid(myCatch)){
            let result = await addCatch(myCatch);
            await listAllCatches();
        }
    });

    catches.addEventListener('click', async (event)=>{
        if(event.target.className == 'delete'){
            let result = await deleteCatch(event.target.value);
            await listAllCatches();
        } if(event.target.className == 'update'){
            //parse updated info
            const updateForm = event.target.parentNode;
            console.log(updateForm);
            const angler = updateForm.querySelector('.angler').value;
            const weight = updateForm.querySelector('.weight').value;
            const species = updateForm.querySelector('.species').value;
            const location = updateForm.querySelector('.location').value;
            const bait = updateForm.querySelector('.bait').value;
            const captureTime = updateForm.querySelector('.captureTime').value;
            let myCatch = { angler, weight, species, location, bait };
            myCatch['captureTime '] = captureTime;
            if(isValid(myCatch)){
                let result = await updateCatch(event.target.value, myCatch);
            }
        }
    });
}

async function listAllCatches() {
    const token = sessionStorage.getItem('userToken');
    const userId = sessionStorage.getItem('userId');
    let result = await request('http://localhost:3030/data/catches');
    console.log(result);
    const catches = document.getElementById('catches');
    // clear all contents
    catches.innerHTML = '';
    // create new 
    result.forEach(element => {
        let result = `<div class="catch">
        <label>Angler</label>
        <input type="text" class="angler" value="${element.angler}" />
        <hr>
        <label>Weight</label>
        <input type="number" class="weight" value="${element.weight}" />
        <hr>
        <label>Species</label>
        <input type="text" class="species" value="${element.species}" />
        <hr>
        <label>Location</label>
        <input type="text" class="location" value="${element.location}" />
        <hr>
        <label>Bait</label>
        <input type="text" class="bait" value="${element.bait}" />
        <hr>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${element['captureTime ']}" />
        <hr>`;
        if (token != null && element._ownerId == userId) {
            result += `<button class="update" value="${element._id}">Update</button>
            <button class="delete" value="${element._id}">Delete</button></div>`;
        } else {
            result += `<button disabled class="update">Update</button>
            <button disabled class="delete">Delete</button>`;
        }
        catches.innerHTML += result;

    });
}

function parseForm() {
    const addForm = document.getElementById("addForm");
    const angler = addForm.querySelector('.angler').value;
    const weight = addForm.querySelector('.weight').value;
    const species = addForm.querySelector('.species').value;
    const location = addForm.querySelector('.location').value;
    const bait = addForm.querySelector('.bait').value;
    const captureTime = addForm.querySelector('.captureTime').value;
    let myCatch = { angler, weight, species, location, bait };
    myCatch['captureTime '] = captureTime;
    console.log(myCatch);
    return myCatch;
}

async function addCatch(myCatch) {
    const token = sessionStorage.getItem('userToken');
    const result = await request('http://localhost:3030/data/catches', {
        method: 'post',
        headers: {
            'X-Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myCatch)
    });
    console.log(result);
    return result;
}

async function updateCatch(id, myCatch) {
    const token = sessionStorage.getItem('userToken');
    const result = await request('http://localhost:3030/data/catches/'+id, {
        method: 'put',
        headers: {
            'X-Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myCatch)
    });
    console.log(result);
    return result;
}

async function deleteCatch(id) {
    const token = sessionStorage.getItem('userToken');
    const result = await request('http://localhost:3030/data/catches/'+id, {
        method: 'delete',
        headers: {
            'X-Authorization': token
        }
    });
    // console.log(result);
    return result;
}

function isValid(myCatch){
    if(typeof myCatch.angler != 'string' ||
    myCatch.angler == '' ||
    myCatch.weight < 1 ||
    myCatch.weight == undefined ||
    myCatch.species == ''||
    myCatch.location == ''||
    myCatch.bait == ''||
    myCatch['captureTime '] < 1 ||
    myCatch['captureTime '] == undefined){
        alert('Please fill all fields correctly!');
        return false;
    }
    return true;

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

attachEvents();

