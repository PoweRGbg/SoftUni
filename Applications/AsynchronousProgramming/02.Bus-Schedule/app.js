function solve() {
    const url = `http://localhost:3030/jsonstore/bus/schedule/`;
    let info = document.getElementsByClassName('info')[0];
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let currentStop = { name: 'depot', next: '0361' };

    async function depart() {
        try {
            let response = await fetch(url + currentStop.next);
            json = await response.json();
            info.innerText = 'travelling';
            info.innerText = `Next stop ${currentStop.name}`;
            currentStop = json;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch (errot) {
            info.innerText = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        info.innerText = `Arriving at ${currentStop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
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
let result = solve();