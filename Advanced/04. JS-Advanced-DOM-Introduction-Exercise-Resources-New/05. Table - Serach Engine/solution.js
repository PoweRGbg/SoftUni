function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let rows = document.getElementsByClassName('container')[0].getElementsByTagName("tr");
      const searchingFor = document.getElementById('searchField').value;

      for (const row of rows) {
         let cells = row.getElementsByTagName('td');
         row.className = ''
         for (const cell of cells) {
            if(cell.innerText.includes(searchingFor)){
               row.className = 'select';
            }
         }
      }


      document.getElementById('searchField').value = '';

   }
}