var orBoard

//keeps spots from being reused. player 1 is human, 2 is comp
const player1 = "O"
const player2 = "X"

//winning combos. Try an array to check board at end of game
const winCombo = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
]


//create box attributes
let cells = document.querySelectorAll('.cell'); 
startGame();

//starts game, creates endgame and reset button attributes
function startGame() {
    document.querySelector(".endgame").style.display = "none"; //resets board
    orBoard = Array.from(Array(9).keys()); //makes array every number from 0 - 9
    for (var i = 0; i < cells.length; i++) { //removes everythign from cells at end of game
        cells[i].innerText = ""
        cells[i].addEventListener('click', turnClick, false) //I DID NOT ADD BACKGROUND COLOR HERE
    }
}

function turnClick(cell) {
    turn(cell.target.id, player1) //human player. turn funtion can be called with AI player
}

function turn(cellID, player) { //square ID and human player
    orBoard[cellID] = player; //shows player who just went
    document.getElementById(cellID).innerText = player; //selects element with certain ID
    let gameWon = checkWin(player, orBoard)
    if (gameWon) gameOver(gameWon)
}

function checkWin(player1, winCombo) { 
for(var i=0;i<winCombo.length;i++) {
  if(winCombo[i] == player1){
      return true;
    }
}
return false;
}


function gameOver(gameWon) {
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
}








/*function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => //e = element in board array, i is index
		(e === player) ? a.concat(i) : a, []); //if element = player, concat means add index to array. if it doesn't equal, don't add index. finds every square player has played in
        let gameWon = null;
        for (let [indexedDB, win] of winCombos.entries()) { //gets index and win. one variable will be index number, the ther will be win combos
            if (win.every(elem => plays.indexOf(elem) > -1)) { //has the player played in all the spots that are win combos
                gameWon = {index: index, player: player}; //which win combo player won at, which player won
                break;
            }
        }
        return gameWon;
    }
*/