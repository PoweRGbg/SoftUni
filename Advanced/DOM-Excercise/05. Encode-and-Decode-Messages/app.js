function encodeAndDecodeMessages() {
    // get buttons 
    const buttons = document.querySelectorAll('button');
    //get textareas 
    const textAreas = document.querySelectorAll('textarea');
    // add listeners

    // const map = {
    //     encode:{
    //         text: textAreas[0],
    //         btn: buttons[0],
    //         func: (char) => String.fromCharCode(char.charCodeAt(0)+1)
    //     },
    //     decode:{
    //         text: textAreas[1],
    //         btn: buttons[1],
    //         func: (char) => String.fromCharCode(char.charCodeAt(0)-1)
    //     }
    // }
    // document.getElementById('main').addEventListener('click', (e) =>{
    //     if(e.target.tagName != 'BUTTON'){
    //         return;
    //     }

    //     const type = e.target.textContent.includes('Encode')? 'encode':'decode';

    //     let message = map[type].text.value.split('').map(map[type].func).join('');

    //     map.encode.text.value = '';
    //     map.decode.text.value = message;

    // });
    buttons[0].addEventListener('click', (e) => { 
        // encode message and display it
        let message = textAreas[0].value.split('');
        let encoded = [];
        for (let index = 0; index < message.length; index++) {
            const char = message[index];
            encoded.push(String.fromCharCode(char.charCodeAt(0) + 1)); 
        }
        textAreas[0].value = '';
        textAreas[1].value = encoded.join('');
    });
    //decode mesage
    buttons[1].addEventListener('click', (e) => { 
        let message = textAreas[1].value.split('');
        let decoded = [];
        for (let index = 0; index < message.length; index++) {
            const char = message[index];
            decoded.push(String.fromCharCode(char.charCodeAt(0) - 1)); 
        }
        textAreas[0].value = '';
        textAreas[1].value = decoded.join('');
    });
}