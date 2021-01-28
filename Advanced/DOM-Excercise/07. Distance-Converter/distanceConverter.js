function attachEventsListeners() {
    // object with units 
    // everything converted to meters first
    const units = {
        'km': 1000,
        'm': 1,
        'cm': 0.01,
        'mm': 0.001,
        'mi': 1609.34,
        'yrd': 0.9144,
        'ft': 0.3048,
        'in': 0.0254
    }
    // adding a click event listener to a button
    document.getElementById('convert').addEventListener('click', (e) =>{
        // read the value from the input field and 
        const inputDistance = Number(document.getElementById('inputDistance').value);
        // get the selected option from the input and output units drop downs
        const inputUnits = document.getElementById('inputUnits').value;
        const outputUnits = document.getElementById('outputUnits').value;
        
        // convert to meters 
        let inMeters = inputDistance * units[inputUnits];
        // convert result to output
        let output = inMeters / units[outputUnits];
        // write output
        document.getElementById('outputDistance').value = output;
    });
}