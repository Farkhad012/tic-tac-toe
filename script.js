// Получаем контейнер игры
const gameContainer = document.getElementById('game_container' );
gameContainer.style.display = 'flex';
gameContainer.style.flexDirection = 'column';
gameContainer.style.alignItems = 'center';


// Создаем заголовок и устанавливаем стили
const title = createStyledElement('div', 'Tic Tac Toe', { color: '#8db600', fontSize: '60px', width: '100vw', textAlign: 'center', marginBottom: '30px' });

// Создаем игровое поле и устанавливаем стили
const field = createStyledElement('div', '', { width: '300px', height: '300px', gap: '1px', display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gridTemplateColumns: 'repeat(3, 1fr)' });

// Инициализируем игровую доску (9 ячеек)
const board = Array(9).fill('');

// Текущий игрок (начинает X)
let currentPlayer = 'X';

// Устанавливаем стили и обработчик клика для каждой ячейки
for (let i = 0; i < 9; i++) {
  const cell = createStyledElement('div', '', { backgroundColor: 'lightgray', border: '2px solid #000', borderRadius: '5px' });
  cell.id = `cell${i}`;
  cell.classList.add('cell');
  cell.dataset.index = i;
  cell.addEventListener('click', handleCellClick);
  field.appendChild(cell);
}

// Создаем кнопку для очистки поля и устанавливаем стили
const clearButton = createStyledElement('button', 'Новая игра', { width: '200px', height: '60px', border: '2px solid #000', borderRadius: '5px', fontSize: '30px', marginTop: '30px' });
clearButton.id = 'clearButton';
clearButton.addEventListener('click', handleClearButtonClick);

// Добавляем элементы в контейнер игры
gameContainer.appendChild(title);
gameContainer.appendChild(field);
gameContainer.appendChild(clearButton);

// Функция для создания элемента с текстом и стилями
function createStyledElement(tag, text, styles) {
  const element = document.createElement(tag);
  element.textContent = text;
  Object.assign(element.style, styles);
  return element;
}

// Функция для обновления отображения ячеек
function updateBoard() {
  document.querySelectorAll('.cell').forEach((cell, index) => cell.textContent = board[index]);
}

// Функция для проверки победы по горизонтальным линиям
function checkHorizontalWin() {
  for (let i = 0; i < 3; i++) {
    const startIdx = i * 3;
    if (board[startIdx] === currentPlayer && board[startIdx + 1] === currentPlayer && board[startIdx + 2] === currentPlayer) {
      markWinningCells(startIdx, startIdx + 1, startIdx + 2);
      return true;
    }
  }
  return false;
}

// Функция для проверки победы по вертикальным линиям
function checkVerticalWin() {
  for (let i = 0; i < 3; i++) {
    if (board[i] === currentPlayer && board[i + 3] === currentPlayer && board[i + 6] === currentPlayer) {
      markWinningCells(i, i + 3, i + 6);
      return true;
    }
  }
  return false;
}

// Функция для проверки победы
function checkWin() {
  if (checkHorizontalWin() || checkVerticalWin()) {
    return true;
  }

  // Проверка диагональных линий
  if (board[0] === currentPlayer && board[4] === currentPlayer && board[8] === currentPlayer) {
    markWinningCells(0, 4, 8);
    return true;
  }

  if (board[2] === currentPlayer && board[4] === currentPlayer && board[6] === currentPlayer) {
    markWinningCells(2, 4, 6);
    return true;
  }
  

  return false;
}

// Функция для окрашивания выигрышных ячеек
function markWinningCells(...cells) {
  cells.forEach((cellIndex) => document.getElementById(`cell${cellIndex}`).classList.add('winning-cell'));
}

// Функция для смены игрока
function switchPlayer() {
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

// Обработчик события клика по ячейке
function handleCellClick(event) {
  const clickedCellIndex = event.target.dataset.index;
  if (board[clickedCellIndex] === '' && !checkWin()) {
    board[clickedCellIndex] = currentPlayer;
    updateBoard();
    if (!checkWin()) {
      switchPlayer();
    }
  }
}

// Обработчик события клика по кнопке очистки
function handleClearButtonClick() {
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('winning-cell');
  });
  board.fill('');
  currentPlayer = 'X';
}
