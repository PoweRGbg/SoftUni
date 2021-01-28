function addItem() {
    // get menu 
    const menu = document.getElementById('menu');
    
    // get value of fields
    const itemText = document.getElementById('newItemText').value;
    const itemValue = document.getElementById('newItemValue').value;
    // construct element option
    const newOption = document.createElement('option');
    newOption.textContent = itemText;
    newOption.value = itemValue;
    // add it to menu
    menu.appendChild(newOption);

    //clear fields
    document.getElementById('newItemText').value = "";
    document.getElementById('newItemValue').value = "";
}