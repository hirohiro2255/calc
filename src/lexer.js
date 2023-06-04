class Lexer {
  constructor(text) {
    this.text = text;
    this.pos = 0;
    this.currentChar = this.text[this.pos];
  }

  genError() {
    throw new Error('Invalid character');
  }

  advance() {
    this.pos++;
    if (this.pos > this.text.length - 1) {
      this.currentChar = null;
    } else {
      this.currentChar = this.text[this.pos];
    }
  }

  skipWhiteSpace() {
    while (this.currentChar !== null && this.currentChar === ' ') {
      this.advance();
    }
  }

  integer() {
    let result = '';
    // counter to count dot
    let dot = 0;
    while (
      this.currentChar !== null &&
      (isDigit(this.currentChar) || this.currentChar === '.')
    ) {
      result += this.currentChar;
      this.advance();
    }
    return Number.parseFloat(result);
  }

  getNextToken() {
    while (this.currentChar !== null) {
      if (this.currentChar === ' ') {
        this.skipWhiteSpace();
        continue;
      }

      if (isDigit(this.currentChar)) {
        return new Token(TokenType.INTEGER, this.integer());
      }

      if (this.currentChar === '+') {
        this.advance();
        return new Token(TokenType.PLUS, '+');
      }

      if (this.currentChar === '-') {
        this.advance();
        return new Token(TokenType.MINUS, '-');
      }

      if (this.currentChar === '*') {
        this.advance();
        return new Token(TokenType.MUL, '*');
      }

      if (this.currentChar === '/') {
        this.advance();
        return new Token(TokenType.DIV, '/');
      }

      if (this.currentChar === '(') {
        this.advance();
        return new Token(TokenType.LPAREN, '(');
      }

      if (this.currentChar === ')') {
        this.advance();
        return new Token(TokenType.RPAREN, ')');
      }

      this.genError();
    }
    return new Token(TokenType.EOF);
  }
}
