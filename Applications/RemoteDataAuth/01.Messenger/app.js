const url = 'http://localhost:3030/jsonstore/messenger';
function attachEvents() {
    getMesssages();
    document.getElementById('submit').addEventListener('click', async ()=>{
        let author = document.getElementById('author').value;
        let content = document.getElementById('content').value;
        const message = {author, content};
        if(message.author == '' || message.content == ''){
            alert('both fiealds are required!');
        } else {
            let result = await putMessage(message);
            if(result._id != undefined){
                await getMesssages();
                // clear fields
                document.getElementById('author').value = '';
                document.getElementById('content').value = '';
            }
        }
    });

    document.getElementById('refresh').addEventListener('click', async ()=>{
            await getMesssages();
    });
}


async function request(url, options){
    const response = await fetch(url, options);
    if(response.ok == false){
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await response.json();
    return data;
}
async function putMessage(message){
    // if(message.author != undefined && message.content != undefined){

        const result = await request(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(message)
        });
        return result;
    // }
}

async function getMesssages(){
    let textArea = document.getElementById('messages');
    textArea.value = '';
    let messages = await request(url);
    let display = [];
    Object.entries(messages).forEach(element => {
        const author = element[1].author;        
        const message = element[1].content;
        display.push(`${author}: ${message}`);
    });
    textArea.value = display.join('\n');
}
attachEvents();