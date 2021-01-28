function lockedProfile() {
    console.log('TODO...')
    // get all divs
    let divs = Array.from(document.querySelectorAll('button'));
    divs.forEach(element => {
        // console.log(element.parentNode);
        // add event listener
        element.addEventListener('click' , showMore);
    });

    function showMore(e){
        // get locked/unlocked
        let radios = e.target.parentNode.querySelectorAll('input[type=radio]');
        //get hidden
        let hiddenFields = e.target.parentNode.querySelectorAll('div');
        hiddenFields = hiddenFields[hiddenFields.length - 1]; // last div
        if(radios[1].checked == true){
            // change button text
            if(e.target.innerText == 'Hide it'){
                e.target.innerText = 'Show more';
                hiddenFields.style.display = 'none';
            } else {
                e.target.innerText = 'Hide it';
                hiddenFields.style.display = 'block';
            }
            

        } 

    }
}