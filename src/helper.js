const TokenType = {
  INTEGER: 'integer',
  PLUS: 'plus',
  MINUS: 'minus',
  MUL: 'mul',
  DIV: 'div',
  LPAREN: '(',
  RPAREN: ')',
  EOF: 'eof',
};

function isDigit(v) {
  const n = Number.parseFloat(v);

  return !isNaN(n) && Number.isSafeInteger(n);
}

function checkType(v) {
  return Object.prototype.toString.call(v);
}

function isOp(c) {
  return c === '+' || c === '-' || c === '*' || c === '/';
}
