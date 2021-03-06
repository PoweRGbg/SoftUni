async function load() {
    try {
        const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
        let section = document.getElementsByTagName('section')[0];
        section.innerHTML = '';
        let extra = document.getElementById('extra');
        const main = document.getElementById('main');
        let response = await fetch(url);
        let articles = await response.json();
        Object.values(articles).forEach(article => {
            const div = e('div', { className: 'accordion' });
            const head = e('div', { className: 'head' });
            const title = e('span', {}, article.title);
            const button = e('span', { 'onClick': toggle, id: article._id, className: 'button' }, 'More');
            head.appendChild(title);
            head.appendChild(button);
            const extra = e('div', { className: 'extra' }, e('p', {}));
            extra.style.display = 'none';

            div.appendChild(head);
            div.appendChild(extra);

            section.appendChild(div);
        });
    } catch (error) {
        console.log(error);
    }
}

async function toggle(event) {
    try {

        let id = event.target.id;
        const accordion = event.target.parentNode.parentNode;
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        let extra = accordion.getElementsByClassName('extra')[0];
        if (event.target.innerText == "LESS") {
            extra.style.display = 'none';
            event.target.innerText = "More";
            return;
        }
        extra.innerHTML = '';

        let response = await fetch(url);
        let article = await response.json();

        const content = e('p', {}, article.content);
        extra.appendChild(content);
        extra.style.display = '';
        event.target.innerText = "Less";

    } catch (error) {
        console.log(error);
    }
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

load();