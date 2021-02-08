function notify(message) {
  let where  = document.getElementById('notification');
  where.innerText = message;
  where.style.display = 'block';
  where.addEventListener('click', ()=>{
    where.style.display = 'none';
    
  });
}