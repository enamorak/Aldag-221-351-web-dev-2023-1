var board = ['', '', '', '', '', '', '', '', '']; 
var currentPlayer = 'X'; 
 
function checkWinner() { 
  for (var i = 0; i < 3; i++) { 
    if (board[i*3] === currentPlayer && board[i*3+1] === currentPlayer && board[i*3+2] === currentPlayer || 
        board[i] === currentPlayer && board[i+3] === currentPlayer && board[i+6] === currentPlayer || 
        board[0] === currentPlayer && board[4] === currentPlayer && board[8] === currentPlayer || 
        board[2] === currentPlayer && board[4] === currentPlayer && board[6] === currentPlayer) { 
      return true; 
    } 
  } 
  if (board.every(function(cell) { return cell !== ''; })) {
    alert('Ничья!'); 
    board = ['', '', '', '', '', '', '', '', '']; 
    renderBoard(); 
  }
  return false; 
} 
 
function makeMove(index) { 
  if (board[index] === '') { 
    board[index] = currentPlayer; 
    renderBoard(); 
    if (checkWinner()) { 
      alert('Игрок ' + currentPlayer + ' выиграл!'); 
      board = ['', '', '', '', '', '', '', '', '']; 
      renderBoard(); 
    } else { 
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
    } 
  } else { 
    alert('Эта клетка занята. Выберите другую.'); 
  } 
} 
 
function renderBoard() { 
  var boardElement = document.getElementById('board'); 
  boardElement.innerHTML = ''; 
  for (var i = 0; i < 9; i++) { 
    var cell = document.createElement('div'); 
    cell.className = 'cell'; 
    cell.textContent = board[i]; 
    cell.addEventListener('click', makeMove.bind(null, i)); 
    boardElement.appendChild(cell); 
  } 
} 
 
renderBoard();