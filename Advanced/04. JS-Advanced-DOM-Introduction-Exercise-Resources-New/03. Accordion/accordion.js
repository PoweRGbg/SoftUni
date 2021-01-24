function toggle() {
    let button = document.getElementsByClassName("button")[0];
    let extra = document.getElementById('extra');
    if(button.innerHTML == 'More'){
        button.innerHTML = 'Less';
    } else {
        button.innerHTML = 'More';
    }
    if(extra.style.display == 'none' || extra.style.display == ''){
        extra.style.display ='block';
    } else {
        extra.style.display = 'none'
    }
}