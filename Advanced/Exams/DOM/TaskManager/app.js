function solve() {
    let task = document.getElementById('task');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let open = document.getElementsByClassName('orange')[0].parentNode.parentNode.children[1];
    let inProgress = document.getElementsByClassName('yellow')[0].parentNode.parentNode.children[1];
    let finished = document.getElementsByClassName('green')[0].parentNode.parentNode.children[1];
    const addBtn = document.getElementsByTagName('button')[0];
    addBtn.type = 'button';
    addBtn.addEventListener('click', function (event) {
        event.preventDefault();
        if (task.value == '' || description.value == '' | date.value == '') {
            // do nothing
        } else {
            let article = e('article');
            let name = e('h3', {}, task.value);
            let descrParagraph = e('p', {}, 'Description: '+description.value);
            let dateParagraph = e('p', {}, 'Due Date: '+date.value);
            let div = e('div', { 'className': 'flex' });
            let startBtn = e('button', { 'className': 'green' }, 'Start');
            let del = e('button', { 'className': 'red' }, 'Delete');
            div.appendChild(startBtn);
            div.appendChild(del);
            article.appendChild(name);
            article.appendChild(descrParagraph);
            article.appendChild(dateParagraph);
            article.appendChild(div);
            open.appendChild(article);
            del.addEventListener('click', function (delEvent) {
                let currentArticle = delEvent.target.parentNode.parentNode;
                currentArticle.parentNode.removeChild(article);
            });
            startBtn.addEventListener('click', function (delEvent) {
                let currentArticle = delEvent.target.parentNode.parentNode;
                currentArticle.parentNode.removeChild(article);
                let buttons = currentArticle.lastChild;
                currentArticle.removeChild(buttons);
                let div = e('div', { 'className': 'flex' });
                let del = e('button', { 'className': 'red' }, 'Delete');
                let finishBtn = e('button', { 'className': 'orange' }, 'Finish');
                div.appendChild(del);
                div.appendChild(finishBtn);
                currentArticle.appendChild(div);
                inProgress.appendChild(currentArticle);
                del.addEventListener('click', function (delEvent) {
                    let currentArticle = delEvent.target.parentNode.parentNode;
                    currentArticle.parentNode.removeChild(article);
                });
                finishBtn.addEventListener('click', function (delEvent) {
                    let currentArticle = delEvent.target.parentNode.parentNode;
                    currentArticle.parentNode.removeChild(article);
                    let buttons = currentArticle.lastChild;
                    currentArticle.removeChild(buttons);
                    finished.appendChild(article);
                });
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