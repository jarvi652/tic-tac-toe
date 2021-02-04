/* we are using oop
represent the gameboard in an object
store the input 'o' and 'x' in an array
create private IEFE FUNCTIONS
create a global function 
logic that checks when game is over
 */
const display = document.querySelector('.status')
let gameActive = true
let gameState = ["","","","","","","","",""]
let currentPlayer = 'X'
const winningMessage = ()=> `Player ${currentPlayer} has won!`
const drawMessage = ()=> `Game ended in a draw!`
const currentPlayerTurn =()=>`It is ${currentPlayer}'s turn`
display.innerHTML =currentPlayerTurn()
function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] =currentPlayer
    clickedCell.innerHTML = currentPlayer
}
function handlePlayerChange(){
    currentPlayer = currentPlayer === "X" ? "O" : "X"
    display.innerHTML =currentPlayerTurn()
}
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
function handleResultValidation(){
    let roundWon = false
    for(let i=0; i<=7; i++){
        const winCondition = winningConditions[i]
        let a = gameState[winCondition[0]]
        let b = gameState[winCondition[1]]
        let c = gameState[winCondition[2]]
        if(a === '' || b === '' || c === '' ){
            continue
        }
        if(a === b && b === c){
            roundWon =true
            break
        }
    }
    if(roundWon){
        status.innerHTML=winningMessage()
        gameActive = false
        return
    }
    let roundDraw = !gameState.includes("")
    if(roundDraw){
        status.innerHTML=drawMessage()
        gameActive = false
        return
    }
    handlePlayerChange()
}
function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('index'))
    if (gameState[clickedCellIndex] !== "" || !gameActive){
        return
    }
    handleCellPlayed(clickedCell, clickedCellIndex)
    handleResultValidation()
}
function handleRestartGame(){
    gameActive = true
    currentPlayer = "X"
    gameState = ["","","","","","","","",""]
    display.innerHTML = currentPlayerTurn()
    document.querySelectorAll('.cross').forEach(cross =>cross.innerHTML='')

}
document.querySelectorAll('.cross').forEach(cross=>cross.addEventListener('click',handleCellClick))
document.querySelector('.btn').addEventListener('click', handleRestartGame)