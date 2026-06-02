const btn = document.querySelector('#login');
const nameBox = document.querySelector('#input-name');
const lastName = document.querySelector('#input-lastname');
const emailInput = document.querySelector('#input-email');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const house = document.querySelector('#house');
const agreement = document.querySelector('#agreement');
const txtAgreement = document.querySelector('#label-infos');
const txtArea = document.querySelector('#textarea');
const submitBtn = document.querySelector('#submit-btn');
const family = document.querySelectorAll('.family');
const materia = document.querySelectorAll('input[name="materia"]');
const rateBtn = document.querySelectorAll('input[name="rate"]');
const evalForm = document.querySelector('#evaluation-form');

function selectCheck(verif) {
  const arr = [];
  for (let i = 0; i < verif.length; i += 1) {
    if (verif[i].checked) {
      arr.push(verif[i].value);
    }
  }
  if (arr.length > 1) {
    return arr.join(', ');
  }
  return arr;
}

function generatePar(tudao) {
  for (let i = 0; i < tudao.length; i += 1) {
    const br = document.createElement('br');
    const p = document.createElement('p');
    evalForm.appendChild(p);
    evalForm.appendChild(br);
    p.innerHTML = tudao[i];
  }
}

function prevent(event) {
  event.preventDefault();
  const fullName = `Nome: ${nameBox.value} ${lastName.value}`;
  const inputEmail = `Email: ${emailInput.value}`;
  const inputHouse = `Casa: ${house.value}`;
  const inputFamily = `Família: ${selectCheck(family)}`;
  const inputSubject = `Matérias: ${selectCheck(materia)}`;
  const inputRate = `Avaliação: ${selectCheck(rateBtn)}`;
  const inputObs = `Observações: ${txtArea.value}`;

  const tudo = [fullName, inputEmail, inputHouse, inputFamily, inputSubject, inputRate, inputObs];
  evalForm.innerHTML = '';
  generatePar(tudo);
}

function contador() {
  const counter = document.querySelector('#counter');
  if (txtArea.textLength < 500) {
    counter.innerHTML = (500 - txtArea.textLength);
  }
}

function alerta() {
  const validEmail = 'tryber@teste.com';
  const validPassword = '123456';
  if (email.value === validEmail && senha.value === validPassword) {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

function liberaEnviar() {
  const butao = document.querySelector('#submit-btn');
  if (agreement.checked === true) {
    butao.disabled = false;
  } else {
    butao.disabled = true;
  }
}

submitBtn.addEventListener('click', prevent);
agreement.addEventListener('click', liberaEnviar);
txtAgreement.addEventListener('click', liberaEnviar);
txtArea.addEventListener('keyup', contador);
btn.addEventListener('click', alerta);
house.selectedIndex = -1;
