class PaymentManager {
    constructor(title) {
        this.title = title;
        this.payments = [];
    }

    render(targetId) {
        // get element by import 
        // this.payments.push({ name: 'a', category: 'a', price: 1 });
        let target = document.getElementById(targetId);
        let table = this.e('table', {}, this.e('caption', {}, this.title + ' Payment Manager'));
        let head = this.e('thead', {}, this.e('tr', {}, this.e('th', { className: 'name' }, 'Name'),
            this.e('th', { 'className': 'category' }, 'Category'),
            this.e('th', { 'className': 'price' }, 'Price'),
            this.e('th', {}, 'Actions')));
        let body = this.e('tbody', { className: 'payments' });
        this.payments.forEach(payment => {
            let paymentRow = this.e('tr');
            let name = this.e('td', {}, payment.name);
            let category = this.e('td', {}, payment.category);
            let price = this.e('td', {}, payment.price);
            let delBtn = this.e('button', {}, 'Delete');
            let delTd = this.e('td', {}, delBtn);
            paymentRow.appendChild(name);
            paymentRow.appendChild(category);
            paymentRow.appendChild(price);
            paymentRow.appendChild(delTd);
            body.appendChild(paymentRow);
            delBtn.addEventListener('click', function (event) {
                let tr = event.target.parentNode.parentNode;
                tr.parentNode.removeChild(tr);
            });
        });

        // add field
        let tfoot = this.e('tfoot', { className: 'input-data' });
        let addRow = this.e('tr');
        let name = this.e('td', {}, this.e('input'));
        let category = this.e('td', {}, this.e('input'));
        let price = this.e('td', {}, this.e('input'));
        let addBtn = this.e('button', {}, 'Add');
        let delTd = this.e('td', {}, addBtn);
        addRow.appendChild(name);
        addRow.appendChild(category);
        addRow.appendChild(price);
        addRow.appendChild(delTd);
        tfoot.appendChild(addRow);
        addBtn.addEventListener('click', function (event) {
            let tr = event.target.parentNode.parentNode;
            let nameField = tr.getElementsByTagName('input')[0];
            let categoryField = tr.getElementsByTagName('input')[1];
            let priceField = tr.getElementsByTagName('input')[2];
            if (nameField.value != '' && categoryField.value != '' && priceField.value != '') {
                let tr = document.createElement('tr');
                let name = document.createElement('td');
                name.appendChild(document.createTextNode(nameField.value));
                let category = document.createElement('td');
                category.appendChild(document.createTextNode(categoryField.value));
                let price = document.createElement('td');
                price.appendChild(document.createTextNode(priceField.value));
                let delTd = document.createElement('td');
                let delBtn = document.createElement('button');
                delBtn.appendChild(document.createTextNode("Delete"));
                delTd.appendChild(delBtn);
                tr.appendChild(name);
                tr.appendChild(category);
                tr.appendChild(price);
                tr.appendChild(delTd);
                console.log(body);
                body.appendChild(tr);
                delBtn.addEventListener('click', function (event) {
                    let tr = event.target.parentNode.parentNode;
                    tr.parentNode.removeChild(tr);
                });
                console.log(this.payments);
                nameField.value = '';
                categoryField.value = '';
                priceField.value = '';
                // this.payments.push({ name: nameField.value, category: categoryField.value, price: priceField.value });
                // this.render(targetId);
            }
            // tr.parentNode.removeChild(tr);
        });

        table.appendChild(head);
        table.appendChild(body);
        table.appendChild(tfoot);
        target.appendChild(table);
        // generate rows
        // generate last row
    }


    e(type, attributes = {}, ...content) {
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

