/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // DONE: set "board" to empty HEIGHT x WIDTH matrix array
  let row = [];
  
  for(let y = 0; y < HEIGHT; y++){
    row = [];
    for(let x = 0; x < WIDTH; x++){
      row.push(null);
    }
    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // DONE: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');

  // Creates a top row for accepting user input by adding an event listener for a click. The top row is  populated with n=WIDTH cells and then appended to the htmlBoard in the DOM
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // Creates n=HEIGHT rows to form the main board. Each row is populated with n=WIDTH cells. The cells are applied dynamic ids marking their position ("row# - cell#"). The row is then appended to the htmlBoard in the DOM
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // DONE: write the real version of this, rather than always returning 0
  // For any column "x", check the value in that column in row "y". If empty, return y coordinate. If all rows in the column are filled (i.e. not "null"), return "null"
  for(let y = HEIGHT - 1; y >= 0; y--){
    if(board[y][x] === null){
      return y;
    } 
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // DONE: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.setAttribute('class', 'piece');
  if(currPlayer === 1) {
    piece.classList.add('p1');
  } else {
    piece.classList.add('p2');
  }
  
  const cell = document.getElementById(`${y}-${x}`); // Create variable for table cell with given x/y coordinates
  cell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // DONE: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // DONE: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // DONE: check if all cells in board are filled; if so call, call endGame
  if(board.every(row => row.every(cell => cell !== null))){
    return endGame(`It's a tie!`);
  }

  // switch players
  // DONE: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // DONE: read and understand this code. Add comments to help you.
  // Iterates over each cell in the board and creates 4 groups of cells. The groups are arrays where each element is the starting coordinate followed by 3 adjacent (right or down) or diagonal (down-right or down-left) coordinates. Each group is passed through "_win" to check for a win condition

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
