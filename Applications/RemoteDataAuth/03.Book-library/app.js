const url = 'http://localhost:3030/jsonstore/collections/books';

async function main() {
    const loadBtn = document.getElementById('loadBooks');
    const form = document.getElementById('newBook');
    const editForm = document.getElementById('editBook');
    const table = document.getElementsByTagName('table')[0];
    loadBtn.addEventListener('click', getAllBooks);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let author = formData.get(`author`);
        let title = formData.get(`title`);
        if (author != '' && title != '') {
            let book = { title, author };
            let result = await addBook(book);
            // clear fields
            Array.from(event.target.getElementsByTagName('input')).forEach(element =>{
                element.value = '';
            });
        } else {
            alert('Both fields are required!')
        }
    });

    table.addEventListener('click', async (event)=>{
        if(event.target.className == 'edit'){
            editForm.style.display = 'block';
            form.style.display = 'none';
            let bookId = event.target.value;
            let book = await getBook(bookId);
            let titleField = editForm.getElementsByTagName('input')[0];
            let authorField = editForm.getElementsByTagName('input')[1];
            let idField = editForm.getElementsByTagName('input')[2];
            titleField.value = book.title;         
            authorField.value = book.author;
            idField.value = bookId;
        } else if(event.target.className == 'delete'){
            let result = await deleteBook(event.target.value);
        }
    });

    editForm.getElementsByTagName('button')[0].addEventListener('click', async (event)=>{
        event.preventDefault();
        let formData = new FormData(event.target.parentNode);
        let author = formData.get(`author`);
        let title = formData.get(`title`);
        let id = formData.get(`id`);
        if (author != '' && title != '') {
            let book = { title, author };
            let result = await updateBook(id, book);
            await getAllBooks();
            editForm.style.display = 'none';
            form.style.display = 'block'
        } else {
            alert('Both fields are required!')
        }
    });
}

async function getBook(id) {
    let result = await request(url+'/'+id);
    return result;
}


async function getAllBooks() {
    let result = await request(url);
    let tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    Object.entries(result).forEach(element => {
        tbody.innerHTML += `<TR><TD>${element[1].title}</TD>
                                <TD>${element[1].author}</TD>
                                <TD><button class="edit" value="${element[0]}">Edit</button>
                                <button class="delete" value="${element[0]}">Delete</button></TD></TR>\n`;

    });
    return result;
}



async function addBook(book) {

    const result = await request(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
    return result;

}

async function updateBook(id, book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/'+id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
    return result;

}


async function deleteBook(id) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/'+id, {
        method: 'delete'
    });
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


main();