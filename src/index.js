(() => {
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
  const zero = document.querySelector('#zero');
  const dot = document.querySelector('#dot');

  const add = document.querySelector('#add');
  const div = document.querySelector('#div');
  const mul = document.querySelector('#mul');
  const sub = document.querySelector('#sub');

  const ops = [add, div, mul, sub];

  ops.forEach((op) => {
    op.addEventListener('click', (event) => {
      if (state.length === 0) {
        return;
      }
      if (isOp(state[state.length - 1])) {
        state = state.slice(0, state.length - 1) + event.currentTarget.value;
        result.innerText = state;
        return;
      }
      if (state.at(-1) === '.') {
        return;
      }
      state += event.target.value;
      result.innerText = state;
    });
  });

  const nums = [one, two, three, four, five, six, seven, eight, nine];
  nums.forEach((n, i) => {
    n.addEventListener('click', (event) => {
      if (state.at(-1) === '0' && state.length === 1) {
        state = `${i + 1}`;
        result.innerText = state;
        return;
      }
      state += `${i + 1}`;
      result.innerText = state;
    });
  });

  zero.addEventListener('click', (event) => {
    // if (state.length === 0) {
    //   return;
    // }
    let i = state.length;
    let n = '';
    while (i > 0 && !isOp(state[i])) {
      n += state[i - 1];
      i--;
    }
    if (isOp(n.at(-1))) {
      n = n.slice(0, n.length - 1);
    }
    if (n === '0') {
      return;
    }
    state += event.currentTarget.value.toString();
    result.innerText = state;
  });

  const enter = document.querySelector('#enter');
  const reset = document.querySelector('#reset');
  const clear = document.querySelector('#clear');

  enter.addEventListener('click', (event) => {
    if (state.length === 0) {
      return;
    }
    const op = state.at(-1);
    const v = Number.parseFloat(state.slice(0, state.length - 1));
    if (
      !isNaN(v) &&
      (Number.isSafeInteger(v) || Number.isFinite(v)) &&
      isOp(op)
    ) {
      state += `${v}`;
    }
    const lexer = new Lexer(state);
    const parser = new Parser(lexer);
    const calculator = new Calculator(parser);
    const n = calculator.cc();
    let strNum = n.toString();
    if (strNum.includes('.')) {
      const dotIndex = strNum.indexOf('.');
      let decimalPointValue = strNum.slice(dotIndex + 1);
      if (decimalPointValue.length > 2) {
        decimalPointValue = decimalPointValue.slice(0, 2);
      }
      const integer = strNum.slice(0, dotIndex);
      strNum = `${integer}.${decimalPointValue}`;
    }
    result.innerText = n === Infinity || isNaN(n) ? 0 : strNum;
    state = n === Infinity || isNaN(n) ? '0' : strNum;
  });

  reset.addEventListener('click', (event) => {
    state = '';
    result.innerText = 0;
  });

  clear.addEventListener('click', (event) => {
    state = state.slice(0, state.length - 1);
    result.innerText = state.length === 0 ? 0 : state;
  });

  dot.addEventListener('click', (event) => {
    // When nothing entered
    if (state.length === 0) {
      return;
    }
    if (isOp(state.at(-1))) {
      return;
    }

    let i = state.length;
    while (i >= 0 && !isOp(state[i])) {
      if (state[i] === '.') {
        return;
      }
      i--;
    }

    state += '.';
    result.innerText = state;
  });
})();
