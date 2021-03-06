function addDestination() {
    // clicked adds the new destination to the table with destinations and updates the destinations per season 
    let city = document.getElementsByClassName('inputData')[0];
    let country = document.getElementsByClassName('inputData')[1];
    let select = document.getElementById('seasons');
    //get table
    let destinations = document.getElementById('destinationsList');
    const seasons = {
        summer: 'Summer',
        autumn: 'Autumn',
        winter: 'Winter',
        spring: 'Spring'
    };
    if( city.value != '' && country.value != ''){
        // create row
        let destinationTh = e('td', {}, `${city.value}, ${country.value}`)
        let seasonTh = e('td', {}, `${seasons[select.value]}`)
        let row = e('tr');
        row.appendChild(destinationTh);
        row.appendChild(seasonTh);
        destinations.appendChild(row);
        
        // update summarybox
        let summaryBox = document.getElementById('summaryBox');
        document.getElementById(select.value).value = Number(document.getElementById(select.value).value)+1;
        // clear fields
        city.value = '';
        country.value = '';
    } else {
        // do nothing
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
