function solve() {

  // get text areas 
  const textAreas = document.querySelectorAll('textarea');
  // get buttons
  const buttons = document.querySelectorAll('button');
  buttons[0].addEventListener('click', (e) =>{
    // get table body
    const table = document.querySelector('tbody');
    // parse input from json
    let furniture = JSON.parse(textAreas[0].value);
    furniture.forEach(element => {
      let row = document.createElement('tr');
      let cellImg =  document.createElement('td');
      let imgTag  =  document.createElement('img');
      imgTag.src = element.img;
      cellImg.appendChild(imgTag);
      
      let cellName =  document.createElement('td');
      let parName = document.createElement('p');
      parName.innerText =  element.name;
      cellName.appendChild(parName);

      let cellPrice =  document.createElement('td');
      let parPrice = document.createElement('p');
      parPrice.innerText =  element.price;
      cellPrice.appendChild(parPrice);

      let cellFactor =  document.createElement('td');
      let parFactor = document.createElement('p');
      parFactor.innerText =  element.decFactor;
      cellFactor.appendChild(parFactor);

      let cellCheck =  document.createElement('td');
      let check = document.createElement('input');
      check.type = 'checkbox';
      cellCheck.appendChild(check);

      row.appendChild(cellImg);
      row.appendChild(cellName);
      row.appendChild(cellPrice);
      row.appendChild(cellFactor);
      row.appendChild(cellCheck);
      // generate row <tr>
      table.appendChild(row);
    });
    
  });

  buttons[1].addEventListener('click', (e) =>{
    // get all checks 
    let bought = [];
    let total = 0;
    let decorTotal = 0;
    const checks = Array.from(document.querySelectorAll('input[type=checkbox]'));
    checks.forEach(check => {
      if(check.checked){
        const item = check.parentNode.parentNode.children;
        let name = item[1].children[0].innerText;
        let price = Number(item[2].children[0].innerText);
        let decor = Number(item[3].children[0].innerText);
        // get all names and push them to bought
        bought.push(name);
        // get all prices and add them to total
        total += price;
        // get all decorations
        decorTotal += decor;
      }
      
    });

    //generate output string
    let output = `Bought furniture: ${bought.join(', ')}\nTotal price: ${total.toFixed(2)}\nAverage decoration factor: ${decorTotal/bought.length}`;
    textAreas[1].value = output;
    
  });
}