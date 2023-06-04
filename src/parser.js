import { TokenType } from './utils';

class BinOp {
  constructor(left, op, right) {
    this.left = left;
    this.token = op;
    this.op = op;
    this.right = right;
  }
}

class Num {
  constructor(token) {
    this.token = token;
    this.value = token.value;
  }
}

class UnaryOp {
  constructor(op, expr) {
    this.token = op;
    this.op = op;
    this.expr = expr;
  }
}

export default class Parser {
  constructor(lexer) {
    this.lexer = lexer;
    this.currentToken = this.lexer.getNextToken();
  }

  genError() {
    throw new TypeError('Invalid Syntax');
  }

  consume(tokenType) {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      this.genError();
    }
  }

  factor() {
    const token = this.currentToken;
    if (token.type === TokenType.PLUS) {
      this.consume(TokenType.PLUS);
      const node = new Unaryop(token, this.factor());
      return node;
    } else if (token.type === TokenType.MINUS) {
      this.consume(TokenType.MINUS);
      const node = new UnaryOp(token, this.factor());
      return node;
    } else if (token.type === TokenType.INTEGER) {
      this.consume(TokenType.INTEGER);
      return new Num(token);
    } else if (token.type === TokenType.LPAREN) {
      this.consume(TokenType.LPAREN);
      const node = this.expr();
      this.consume(TokenType.RPAREN);
      return node;
    }
  }

  term() {
    let node = this.factor();

    while ([TokenType.MUL, TokenType.DIV].includes(this.currentToken.type)) {
      const token = this.currentToken;
      if (token.type === TokenType.MUL) {
        this.consume(TokenType.MUL);
      } else if (token.type === TokenType.DIV) {
        this.consume(TokenType.DIV);
      }
      node = new BinOp(node, token, this.factor());
    }
    return node;
  }

  expr() {
    let node = this.term();

    while ([TokenType.PLUS, TokenType.MINUS].includes(this.currentToken.type)) {
      const token = this.currentToken;
      if (token.type === TokenType.PLUS) {
        this.consume(TokenType.PLUS);
      } else if (token.type === TokenType.MINUS) {
        this.consume(TokenType.MINUS);
      }
      node = new BinOp(node, token, this.term());
    }
    return node;
  }

  parse() {
    const node = this.expr();
    if (this.currentToken.type !== TokenType.EOF) {
      this.genError();
    }
    return node;
  }
}
