function solution() {
    //TO DO
    let addGifts = document.getElementsByClassName('card')[0].children[1].getElementsByTagName('input')[0];
    let addBtn = document.getElementsByClassName('card')[0].children[1].getElementsByTagName('button')[0];
    addBtn.addEventListener('click', function (event) {
        event.preventDefault();
        if(addGifts.value != ''){
            let ul = document.getElementsByClassName('card')[1].children[1];
            let sent = document.getElementsByClassName('card')[2].children[1];
            let discarded = document.getElementsByClassName('card')[3].children[1];
            // sort alphabetically 
            // get lis 
            let lis = [];
            let elements = Array.from(ul.getElementsByClassName('gift'));
            elements.forEach(element => {
                lis.push(element.innerText.split('Send')[0]);
            });
            // push them into array
            lis.push(addGifts.value);

            //removechildren
            ul.textContent = '';
            // sort array 
            lis.sort((a,b)=> a.localeCompare(b));
            lis.forEach(liText =>{
                let li = e('li', { 'className': 'gift'}, liText);
                let sendBtn = e('button', { 'id': 'sendButton' }, 'Send');
                let discardBtn = e('button', { 'id': 'discardButton' }, 'Discard');
                li.appendChild(sendBtn);
                sendBtn.addEventListener('click', function (event) {
                    const textOfLI = event.target.parentNode.innerText.split('Send')[0];
                    console.log(textOfLI);
                    event.target.parentNode.parentNode.removeChild(li);
                    let discLI = e('li', { 'className': 'gift'}, textOfLI);
                    sent.appendChild(discLI);
                });
                discardBtn.addEventListener('click', function (event) {
                    const textOfLI = event.target.parentNode.innerText.split('Send')[0];
                    console.log(textOfLI);
                    event.target.parentNode.parentNode.removeChild(li);
                    let discLI = e('li', { 'className': 'gift'}, textOfLI);
                    discarded.appendChild(discLI);
                });
                li.appendChild(discardBtn);
                ul.appendChild(li);
            });
            
            // clear field
            addGifts.value = '';
        }else { 
            // do nothing
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