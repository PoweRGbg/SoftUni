function diagonals(matrix) {
    let sum1 = 0;
    let sum2 = 0;
    let result = [];
    for (let index = 0; index < matrix.length; index++) {
        let rowString = matrix[index].split(' ');
        let row = [];
        rowString.forEach(element => {
            row.push(Number(element));
        });
        result.push(row);
        sum1 += row[index];
        sum2 += row[matrix.length - 1 - index];
    }
    // console.log(' sum1 is '+sum1);
    // console.log(' sum2 is '+sum2);
    if (sum1 == sum2) {
        for (let index = 0; index < result.length; index++) {
            let row = result[index];
            row.forEach((element, i) => {
                if (i != index && i != (row.length - 1 - index)) {
                    result[index][i] = sum1;
                }
            });
        }
    }

    result.forEach(row => {
        console.log(row.join(' '));
    });
}
diagonals(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']);