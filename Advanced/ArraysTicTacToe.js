function ticTacToe(moves) {
    let board = [[false, false, false],
    [false, false, false],
    [false, false, false]];
    let currentPlayer = 'X';
    for (let index = 0; index < moves.length; index++) {
        if (!freeCellsOnBoard()) {
            console.log('The game ended! Nobody wins :(');
            printBoard(board);
        } else {

            const [row, column] = moves[index].split(' ');
            if (board[row][column]) {
                console.log('This place is already taken. Please choose another!');
            } else {
                board[row][column] = currentPlayer;
                //check board
                if (checkboard(board)) {
                    console.log(`Player ${currentPlayer} wins!`);
                    printBoard(board);
                    return;
                }
                // switch player
                currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
            }
        }
    }

    function checkboard(matrix) {
        for (let index = 0; index < matrix.length; index++) {
            const row = matrix[index].join();
            const column = matrix[index][0] + matrix[index][1] + matrix[index][2];
            if (row == 'XXX' || row == 'OOO' || column == 'XXX' || column == 'OOO') {
                return true;
            }
        }
        // check both diagonals
        let diagonal1 = '';
        let diagonal2 = '';
        for (let index = 0; index < matrix.length; index++) {
            diagonal1 += matrix[index][index];
            diagonal2 += matrix[matrix.length - 1 - index][matrix.length - 1 - index];
        }
        if (diagonal1 == 'XXX' || diagonal1 == 'OOO' || diagonal2 == 'XXX' || diagonal2 == 'OOO') {
            return true;
        }
        return false;
    }

    function printBoard(board) {
        board.forEach(row => {
            console.log(row.join('\t'));
        });
    }
    function freeCellsOnBoard() {
        for (const row of board) {
            if (row.indexOf(false) != -1)
                return true;
        }
        return false;
    }
}
ticTacToe(["0 1",
    "1 0",
    "0 2",
    "2 0",
    "0 0",
    "1 2",
    "1 1",
    "2 1",
    "2 2",
    "0 0"]);