function getInfo() {
    const busId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${busId}`;
    let ul = document.getElementById('buses');
    let stopName = document.getElementById('stopName');
    ul.innerHTML = '';
    fetch(url)
        .then(response => response.json())
        .then(json => {
            // console.log(json);
            let bus = json;
            stopName.innerText = bus.name;
            Object.keys(bus.buses).forEach(element => {
                let b = e('li', {}, `Bus ${element} arrives in ${bus.buses[element]}`);
                ul.appendChild(b);
            });
        })
        .catch(error => {
            stopName.innerText = 'Error';

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
