const BUTTON = '[object HTMLButtonElement]';
const keypadContainer = document.querySelector('#keypad-container');
const result = document.querySelector('#result');
result.innerText = 0;

let state = '';

const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const four = document.querySelector('#four');
const five = document.querySelector('#five');
const six = document.querySelector('#six');
const seven = document.querySelector('#seven');
const eight = document.querySelector('#eight');
const nine = document.querySelector('#nine');

const add = document.querySelector('#add');
const div = document.querySelector('#div');
const mul = document.querySelector('#mul');
const sub = document.querySelector('#sub');

const ops = [add, div, mul, sub];

ops.forEach((op) => {
  op.addEventListener('click', (event) => {
    state += event.target.value;
    result.innerHTML = state;
  });
});

const nums = [one, two, three, four, five, six, seven, eight, nine];
nums.forEach((n, i) => {
  n.addEventListener('click', (event) => {
    state += i + 1;
    result.innerText = state;
  });
});

const enter = document.querySelector('#enter');
const reset = document.querySelector('#reset');
const clear = document.querySelector('#clear');

enter.addEventListener('click', (event) => {
  const lexer = new Lexer(state);
  const parser = new Parser(lexer);
  const calculator = new Calculator(parser);
  result.innerText = calculator.calc().toString();
});

reset.addEventListener('click', (event) => {
  state = '';
  result.innerText = 0;
});

clear.addEventListener('click', (event) => {
  state = state.slice(0, state.length - 1);
  result.innerText = state.length === 0 ? 0 : state;
});
