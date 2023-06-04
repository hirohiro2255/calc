export const TokenType = {
  INTEGER: 'integer',
  PLUS: 'plus',
  MINUS: 'minus',
  MUL: 'mul',
  DIV: 'div',
  LPAREN: '(',
  RPAREN: ')',
  EOF: 'eof',
};

export function isDigit(v) {
  const n = Number.parseFloat(v);

  return !isNaN(n) && Number.isSafeInteger(n);
}

export function checkType(v) {
  return Object.prototype.toString.call(v);
}
