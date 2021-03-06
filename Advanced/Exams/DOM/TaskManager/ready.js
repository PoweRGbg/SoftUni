function solve() {
    let [input, open, inProgress, completed] = Array.from(document.querySelectorAll('section'));
    const task = input.querySelector('#task');
    const description = input.querySelector('#description');
    const time = input.querySelector('#date');

    let btnAdd = input.querySelector('#add');
    btnAdd.addEventListener('click', onClick);

    function onClick(e) {
        e.preventDefault();
        if (task.value === '' && description.value === '' && time.value === '') {
            return;
        }

        let btnStar = createTag('button', 'Start', 'green');
        let btnDel = createTag('button', "Delete", 'red');
        let div = createTag('div', 'flex');
        appendChildren(div, btnStar, btnDel);

        let h3 = createTag('h3', input.querySelector('#task').value);
        let pDescr = createTag('p', 'Description: ' + input.querySelector('#description').value);
        let pDate = createTag('p', 'Due Date: ' + input.querySelector('#date').value);

        let art = createTag('article');
        appendChildren(art, h3, pDescr, pDate, div);

        btnStar.addEventListener('click', () => {
            let temp = art;
            art.remove();
            temp.querySelector('button').remove();

            let btnFin = createTag('button', "Finish", 'orange');
            btnFin.addEventListener('click', () => {
                let temp = art;
                art.remove();
                temp.querySelector('div').remove();
                Array.from(completed.querySelectorAll('div'))[1].appendChild(temp);
            });

            temp.querySelector('div').appendChild(btnFin);

            Array.from(inProgress.querySelectorAll('div'))[1].appendChild(temp)
        });
        btnDel.addEventListener('click', () => {
            art.remove();
        });

        Array.from(open.querySelectorAll('div'))[1].appendChild(art);
        task.value = '';
        description.value = '';
        time.value = '';
    }

    function createTag(...param) {
        let temp = document.createElement(param[0]);

        switch (param[0]) {
            case 'button':
                temp.textContent = param[1];
                temp.setAttribute('class', param[2]);
                temp.class = param[2];
                temp.setAttribute('type', param[1]);
                temp.type = param[0];
                break;
            case 'div':
                temp.setAttribute('class', param[1]);
                temp.class = param[1];
                break;
            case 'article':
                break;
            default:
                temp.appendChild(document.createTextNode(param[1]));
                break
        }

        return temp;
    }

    function appendChildren(parent, ...elements) {
        elements.forEach(el => parent.appendChild(el));
    }
}