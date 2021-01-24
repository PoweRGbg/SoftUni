function search() {
   let towns = document.getElementById('towns').getElementsByTagName("li");
   const searchingFor = document.getElementById('searchText').value;
   let matches = 0;
   for (const element of towns) {
      if (element.innerText.includes(searchingFor)) {
         element.style.fontWeight = 'bold';
         element.style.textDecoration = 'underline';
         matches++;
      } else {
         element.style.fontWeight = 'normal';
         element.style.textDecoration = 'none';
      }
   }
   document.getElementById('result').innerText = `${matches} matches found.`
}
