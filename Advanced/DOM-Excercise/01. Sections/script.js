function create(words) {
   let divs = [];
   words.forEach(word => {
      let div = document.createElement('div')
      let par = document.createElement('p')
      par.style.display = 'none';
      par.innerText = word;
      div.appendChild(par);
      div.addEventListener('click', show);
      divs.push(div);
   });

   divs.forEach(div => {
      document.getElementById('content').appendChild(div);
   });
   
   function show(ev){
      ev.target.childNodes[0].style.display= 'inline';
   }
}