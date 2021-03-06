function solve() {
    // TODO ...
    // clicked adds the new destination to the table with destinations and updates the destinations per season 
    let addForm = document.getElementById('add');
    let adoption = document.getElementById('adoption');
    let adopted = document.getElementById('adopted');
    let div = addForm.getElementsByTagName('div')[0];
    let name = div.getElementsByTagName('input')[0];
    let age = div.getElementsByTagName('input')[1];
    let kind = div.getElementsByTagName('input')[2];
    let currentOwner = div.getElementsByTagName('input')[3];
    let addBtn = div.getElementsByTagName('button')[0];
    addBtn.addEventListener('click', function (event) {
        event.preventDefault();
        if (name.value != '' && age.value != '' && kind.value != '' && currentOwner.value != '') {
            // create li
            let li = e('li');
            let p = e('p');
            p.innerHTML = `<strong>${name.value}</strong>` + ' is a ' + `<strong>${age.value}</strong>` + ' year old ' + `<strong>${kind.value}</strong>`;
            let span = e('span');
            span.innerText = `Owner: ${currentOwner.value}`;
            let contactBtn = e('button', {}, `Contact with owner`);
            contactBtn.addEventListener('click', function (event) {
                // check field

                // new field
                let newField = e('input', { 'placeholder': 'Enter your names' });
                let div = e('div');
                let takeBtn = e('button', {}, 'Yes! I take it!');
                div.appendChild(newField);
                div.appendChild(takeBtn);
                takeBtn.addEventListener('click', function (event) {
                    // check field
                    let nameField = event.target.parentNode.getElementsByTagName('input')[0];
                    if (event.target.innerText == 'Yes! I take it!' && nameField.value != undefined && nameField.value != '') {
                        // get parent 
                        let oldLi = event.target.parentNode.parentNode.children[0];
                        let span = e('span');
                        span.innerText = `New Owner: ${nameField.value}`;
                        let removeBtn = e('button', {}, `Checked`);
                        let li = e('li');
                        li.appendChild(oldLi);
                        li.appendChild(span);
                        li.appendChild(removeBtn);
                        removeBtn.addEventListener('click', function (event) {
                            let currentArticle = event.target.parentNode.parentNode;
                            currentArticle.removeChild(event.target.parentNode);
                        });
                        let ul = adopted.children[1];
                        ul.appendChild(li);
                        // delete it from current
                        let currentArticle = event.target.parentNode.parentNode;
                        currentArticle.parentNode.removeChild(currentArticle);
                    }
                });
                event.target.parentNode.insertBefore(div, event.target);
                event.target.parentNode.removeChild(event.target);
            });

            li.appendChild(p);
            li.appendChild(span);
            li.appendChild(contactBtn);
            let ul = adoption.children[1];
            ul.appendChild(li);
            //clear inputs
            name.value = '';
            age.value = '';
            kind.value = '';
            currentOwner.value = '';
        } else {
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
