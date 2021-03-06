async function attachEvents() {
    const symbols = {
        'Sunny': '\u2600', // ☀
        'Partly sunny': '\u26C5', // ⛅
        'Overcast': '\u2601', // ☁
        'Rain': '\u2614', // ☂
        'Degrees': '\u00B0'   // °
    };
    const url = `http://localhost:3030/jsonstore/forecaster/locations`;
    let submitBtn = document.getElementById('submit');
    let location = document.getElementById('location');
    let locations;
    let forecast = document.getElementById('forecast');
    try {
        let response = await fetch(url);
        locations = await response.json(); // is array
    } catch (error) {
        forecast.style.display = '';
        forecast.innerText = error;
    }

    submitBtn.addEventListener('click', (e) => {
        try {
            let found = locations.filter(x => x.name == location.value);
            if (found.length > 0) {
                getToday(found[0].code);
            } else {
                throw new Error('Location not found!');
            }


        } catch (error) {
            forecast.style.display = '';
            forecast.innerText = error;
        }
    });


    async function getToday(locationCode) {
        try {

            let todPromise = await fetch('http://localhost:3030/jsonstore/forecaster/today/' + locationCode);
            let futurePromise = await fetch('http://localhost:3030/jsonstore/forecaster/upcoming/' + locationCode);
            const [todayRes, futureREs] = await Promise.all([todPromise, futurePromise]);
            let today = await todayRes.json();
            let future = await futureREs.json();
            forecast.style.display = '';
            const todayDiv = forecast.children[0];
            const futureDiv = forecast.children[1];
            let todayVis = e('div', { className: 'forecasts' }, '');
            const symbol = e('span', { className: 'condition symbol' }, symbols[today.forecast.condition]);
            const todayCard = e('span', { className: 'condition' });
            const locName = e('span', { className: 'forecast-data' }, today.name);
            const min = e('span', { className: 'forecast-data' }, today.forecast.low + symbols['Degrees'] + '/' + today.forecast.high + symbols['Degrees']);
            const cond = e('span', { className: 'forecast-data' }, today.forecast.condition);
            todayCard.appendChild(locName);
            todayCard.appendChild(min);
            todayCard.appendChild(cond);
            todayVis.appendChild(symbol);
            todayVis.appendChild(todayCard);

            todayDiv.appendChild(todayVis);

            let futureVis = e('div', { className: 'forecasts-info' }, '');
            Object.values(future.forecast).forEach(el => {
                console.log(el);
                const futureCard = e('span', { className: 'upcoming' });
                const cond = e('span', { className: 'forecast-data' }, symbols[el.condition]);
                const min = e('span', { className: 'forecast-data' }, el.low + symbols['Degrees'] + '/' + el.high + symbols['Degrees']);
                const condText = e('span', { className: 'forecast-data' }, el.condition);
                futureCard.appendChild(cond);
                futureCard.appendChild(min);
                futureCard.appendChild(condText);
                futureVis.appendChild(futureCard);
            });

            futureDiv.appendChild(futureVis);
        } catch (error) {
            forecast.style.display = '';
            forecast.innerText = error;
        }

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

attachEvents();