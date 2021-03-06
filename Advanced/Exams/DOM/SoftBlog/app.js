function solve() {
   // clicked adds the new destination to the table with destinations and updates the destinations per season 
   let title = document.getElementById('title')
   let creator = document.getElementById('creator')
   let category = document.getElementById('category')
   let content = document.getElementById('content')
   let btn = document.getElementsByClassName('btn create')[0];


   btn.addEventListener('click', function (event) {
      event.preventDefault();
      if (title.value != '' && creator.value != '' && category.value != '' && content.value != '') {
         let archive = document.getElementsByClassName('archive-section')[0].children[1];
         let posts = document.getElementsByTagName('section')[1];
         let article = e('article', {}, e('h1', {}, title.value));
         let p = e('p', {}, 'Category: ');
         let catText = e('strong', {}, category.value);
         let pCr = e('p', {}, 'Creator: ');
         let creatorText = e('strong', {}, creator.value);
         let contentText = e('p', {}, content.value);
         let buttons = e('div', { className: 'buttons' });
         let delBtn = e('button', { className: 'btn delete' }, 'Delete');
         let archiveBtn = e('button', { className: 'btn archive' }, 'Archive');
         buttons.appendChild(delBtn);
         buttons.appendChild(archiveBtn);

         p.appendChild(catText);
         pCr.appendChild(creatorText);
         article.appendChild(p);
         article.appendChild(pCr);
         article.appendChild(contentText);
         article.appendChild(buttons);

         archiveBtn.addEventListener('click', function (event) {
            let nameOfArticle = event.target.parentNode.parentNode.children[0].innerText;
            event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
            // get all archivet items
            let archived = [];
            let nodes = Array.from(archive.childNodes);
            nodes.forEach(element => {
               archived.push(element.textContent);
            });
            archived.push(nameOfArticle);
            archived.sort();
            // clear current content
            archive.innerHTML = '';
            archived.forEach(element => {
               archive.appendChild(e('li', {}, element));
               
            });
         });

         delBtn.addEventListener('click', function (event) {
            event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
            console.log(event.target.parentNode.parentNode);
         });
         posts.appendChild(article);

      }
   });

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
