function attachEventsListeners() {

    // get which button is clicked
    let daysBtn = document.getElementById('daysBtn');
    daysBtn.addEventListener('click', convert);
    let hoursBtn = document.getElementById('hoursBtn');
    hoursBtn.addEventListener('click', convert);
    let minutesBtn = document.getElementById('minutesBtn');
    minutesBtn.addEventListener('click', convert);
    let secondsBtn = document.getElementById('secondsBtn');
    secondsBtn.addEventListener('click', convert);

    // convert to other time units
    function convert(ev){
        const which = ev.target.id;

        const days = Number(document.getElementById('days').value);
        const hours = Number(document.getElementById('hours').value);
        const minutes = Number(document.getElementById('minutes').value);
        const seconds = Number(document.getElementById('seconds').value);
        
        // change value of other inputs
        if(which == 'daysBtn'){
            document.getElementById('hours').value = days * 24;
            document.getElementById('minutes').value = days * 24 * 60;
            document.getElementById('seconds').value = days * 24 * 60 * 60;
        } else if(which == 'hoursBtn'){
            document.getElementById('days').value = hours / 24;
            document.getElementById('minutes').value = hours * 60;
            document.getElementById('seconds').value = hours * 60 * 60;
        } else if(which == 'minutesBtn'){
            document.getElementById('days').value = (minutes / 60 ) / 24;
            document.getElementById('hours').value = minutes / 60;
            document.getElementById('seconds').value =minutes * 60;
        } else if(which == 'secondsBtn'){
            document.getElementById('days').value = seconds / 60 / 60 / 24;
            document.getElementById('hours').value = seconds / 60 / 60;
            document.getElementById('minutes').value = seconds / 60;
        }
    }
}