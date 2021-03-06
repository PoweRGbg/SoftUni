function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);
    // Write your code here
    let product = document.getElementsByClassName('custom-select')[0];
    let ul = document.getElementsByClassName('display')[0];
    
    let price = document.getElementById('price');
    let qty = document.getElementById('quantity');
    let submit = document.getElementById('submit');
    let total = document.getElementById('sum');
    let capacity = document.getElementById('capacity');
    product.addEventListener('change', function (event) {
        if(event.target.value != ''){
            submit.disabled = false;
        } else {
            submit.disabled = true;
        }
    });
    submit.addEventListener('click', function (event) {
        if(product.value != '' || price.value != '' || qty.value != ''){
            if(Number(capacity.value) + Number(qty.value) >= 150){
                capacity.value = 'full';
                capacity.className = 'fullCapacity';
                product.disabled = true;
                price.disabled = true;
                qty.disabled = true;
                submit.disabled = true;
            }  
                let li = e('li', {}, `Product: ${product.value} Price: ${price.value} Quantity: ${qty.value}`);
                ul.appendChild(li);
                //update capacity and total
                if(capacity.value != 'full')
                capacity.value = Number(capacity.value) + Number(qty.value);
                total.value = Number(total.value) + Number(price.value);
            // reset fields to default
            product.value = '';
            price.value = 1;
            qty.value = 1;
            submit.disabled = true;
        } else {
            // do nothin
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