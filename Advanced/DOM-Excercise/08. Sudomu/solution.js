function solve() {
    // get buttons 
    const buttons = Array.from(document.querySelectorAll('button')); // should be 2 
    buttons[0].addEventListener('click', (ev) => {
        // get row sum and check
        const tbody = Array.from(document.getElementsByTagName('tbody'));
        const rows = Array.from(tbody[0].getElementsByTagName('tr'));
        let sum = 0;
        let solved = true;
        let columns = [];
        rows.forEach((row, rowNumber) => {
            // get sum
            let rowSum = 0;
            let cells = Array.from(row.getElementsByTagName('td'));
            for (let index = 0; index < cells.length; index++) {
                const cell = Number(cells[index].getElementsByTagName('input')[0].value);
                if (columns[index] == undefined) {
                    columns[index] = [];
                }
                columns[index].push(cell);
                rowSum += cell;
            }
            // console.log(`${rowSum} for row ${rowNumber}`);
            if (rowNumber == 0) { // set the sum to the one of the first column
                sum = rowSum;
            } else if (solved) { // compare to previous colums but only if not failed already
                // console.log(`comparing ${sum} with ${rowSum} on row ${rowNumber} => ${sum == rowSum}`);
                solved = (sum == rowSum);
            }

        });
        // get columns and check
        if (solved) {
            columns.forEach(column => {
                let columnSum = column.reduce((a, b) => a + b, 0);
                solved = (columnSum == sum);
            });
        }
        // change style on solved
        const par = document.getElementById('check').children[0];
        const table = document.querySelector('table');
        if (solved) {
            // change div
            par.textContent = "You solve it! Congratulations!";
            par.style.color = 'green';
            table.style.border = '2px solid green';
        } else {
            par.textContent = "NOP! You are not done yet...";
            par.style.color = 'red';
            table.style.border = '2px solid red';
        }
    });

    // clear style event listener
    buttons[1].addEventListener('click', (ev) => {
        const par = document.getElementById('check').children[0];
        const table = document.querySelector('table');
        par.textContent = '';
        par.style.color = '';
        table.style.border = '';

        // clear input fields
        const tbody = Array.from(document.getElementsByTagName('tbody'));
        const rows = Array.from(tbody[0].getElementsByTagName('tr'));
        rows.forEach((row, rowNumber) => {
            // get sum
            let cells = Array.from(row.getElementsByTagName('td'));
            for (let index = 0; index < cells.length; index++) {
                cells[index].getElementsByTagName('input')[0].value = '';
            }
        });
    });

}