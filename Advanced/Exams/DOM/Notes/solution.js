function addSticker(){
    let title = document.getElementsByClassName('title')[0];
    let content = document.getElementsByClassName('content')[0];
    let ul = document.getElementById('sticker-list');
    if(title.value != '' && content.value != ''){
        let li = e('li', {className:'note-content'});
        let close = e('a', {className:'button'}, 'x');
        let h2 = e('h2', {}, title.value);
        let line = e('hr', {});
        let p = e('p', {}, content.value);
        close.addEventListener('click', function (event) {
            ul.removeChild(event.target.parentNode);
        });
        li.appendChild(close);
        li.appendChild(h2);
        li.appendChild(line);
        li.appendChild(p);
        ul.appendChild(li);
        title.value = '';
        content.value = '';
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
}