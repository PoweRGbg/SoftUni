function solve() {
    let name = document.getElementsByName('lecture-name')[0];
    let date = document.getElementsByName('lecture-date')[0];
    let module = document.getElementsByName('lecture-module')[0];

    const addBtn = document.getElementsByTagName('button')[0];
    addBtn.type = 'button';
    addBtn.addEventListener('click', function () {
        if (name.value != '' && date.value != '' && module.value != 'Select module') {
            // get modules
            let modules = document.getElementsByClassName('modules')[0];
            let modElement = e('div', { 'className': module.value });
            console.log(modElement);
            let modName = e('h3', {}, module.value);
            let lectureList = document.createElement('ul');
            // create row with button
            let lecture = e('li', { 'className': 'flex' });
            let h4 = e('h4', {}, name.value + ' - ' + date.value);
            let delButton = 'e(button', { 'className': 'red' }, 'Del');
            delButton.addEventListener('click', function () {
                this.parentNode.parentNode.removeChild(this.parentNode);
                // iterate over all modules and delete every without lectures
                let allClasses = modules.getElementsByTagName('div');
                for (let index = 0; index < allClasses.length; index++) {
                    const element = allClasses[index];
                    let moduleElems = element.getElementsByTagName('li')[0];
                    if (moduleElems == undefined) {
                        modules.removeChild(element);
                    }

                }
            });
            // lecture.appendChild(lectName);
            lecture.appendChild(h4);
            lecture.appendChild(delButton);
            lectureList.appendChild(lecture);
            modName.appendChild(lectureList);
            modElement.appendChild(modName);

            let el = modules.getElementsByClassName(module.value)[0];
            if (modules.children.length == 0 || el == undefined) {
                modules.appendChild(modElement);

            } else {
                // get ul
                let ul = el.getElementsByTagName('ul')[0];
                let li = ul.getElementsByTagName('li');
                let lectures = {};
                for (let index = 0; index < li.length; index++) {
                    const element = li[index].innerText.split(' - ');
                    console.log(element);
                    lectures[element[1].split('Del')[0]] = element[0];
                }
                lectures[date.value] = name.value; // include last input
                let keys = Object.keys(lectures);
                keys.sort();
                el.children[0].removeChild(ul);
                ul = e('ul')
                // implement sorting by date in the module
                keys.forEach(element => {
                    // create li and push it 
                    li = e('li', { 'className': 'flex' }, lectures[element] + ' - ' + element);
                    delButton = e('button', { 'className': 'red' }, 'Del');
                    delButton.addEventListener('click', function () {
                        this.parentNode.parentNode.removeChild(this.parentNode);
                        // iterate over all modules and delete every without lectures
                        let allClasses = modules.getElementsByTagName('div');
                        for (let index = 0; index < allClasses.length; index++) {
                            const element = allClasses[index];
                            let moduleElems = element.getElementsByTagName('li')[0];
                            if (moduleElems == undefined) {
                                modules.removeChild(element);
                            }

                        }
                    });
                    li.appendChild(delButton);
                    ul.appendChild(li);
                });
                el.children[0].appendChild(ul);
            }
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
};