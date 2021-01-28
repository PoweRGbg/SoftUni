function magicMatrices(matrix) {
    for (let index = 0; index < matrix.length; index++) {
        const row = matrix[index];
        let sumrow = 0;
        for (let i = 0; i < matrix.length; i++) {
            let sumcolumn = 0;
            sumrow += Number(row[i]);
            for (let k = 0; k < row.length; k++) {
                const column = matrix[i][k];
                sumcolumn += column;
            }
            if(i == matrix.length -1 && sumrow != sumcolumn){
                return false
            }
        }
    }
    return true
}

magicMatrices([1,2,3]);