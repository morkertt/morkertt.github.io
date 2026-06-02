// https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-template-areas

const palette = document.querySelectorAll('.color');
const limpar = document.querySelector('#clear-board');
const genBoard = document.querySelector('#generate-board');

palette[0].style.backgroundColor = 'black';
palette[0].classList.add('selected');

function limpaBoard() {
  const board = document.querySelectorAll('.pixel');
  for (let i = 0; i < board.length; i += 1) {
    board[i].style.backgroundColor = 'white';
  }
}

function changeColor(origin) {
  const origem = origin;
  const selectBackC = document.querySelector('.selected').style.backgroundColor;
  origem.target.style.backgroundColor = selectBackC;
}

function addClick() {
  const pixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', changeColor);
  }
  console.log(pixels);
}

function createBoard(size) {
  const section = document.querySelector('#pixel-board');
  let tamanho = size;
  if (tamanho < 5) {
    tamanho = 5;
  }
  if (tamanho > 50) {
    tamanho = 50;
  }
  for (let i = 0; i < (tamanho * tamanho); i += 1) {
    const pixel = document.createElement('div');
    section.appendChild(pixel);
    pixel.classList.add('pixel');
    pixel.style.backgroundColor = 'white';
  }
  section.style.gridTemplateColumns = `repeat(${tamanho}, 43px)`;
  addClick();
}

function generateBoard() {
  const valor = document.querySelector('#board-size').value;
  if (valor === '') {
    alert('Board inválido!');
  } else {
    const pai = document.querySelector('.pixel').parentElement;
    const pixel = document.querySelectorAll('.pixel');
    for (let i = 0; i < pixel.length; i += 1) {
      pai.removeChild(pixel[i]);
    }
    createBoard(valor);
  }
}

function selected(origin) {
  for (let i = 0; i < palette.length; i += 1) {
    palette[i].classList.remove('selected');
  }
  origin.target.classList.add('selected');
}

function randomColor() {
  let rgb = 'rgb(';
  for (let i = 0; i < 3; i += 1) {
    rgb += Math.floor(Math.random() * (240 - 10) + 10);
    if (i < 2) {
      rgb += ' , ';
    }
  }
  rgb += ')';
  return rgb;
}

limpar.addEventListener('click', limpaBoard);
genBoard.addEventListener('click', generateBoard);

for (let i = 0; i < palette.length; i += 1) {
  palette[i].addEventListener('click', selected);
  if (i > 0) {
    palette[i].style.backgroundColor = randomColor();
  }
}

createBoard(5);
