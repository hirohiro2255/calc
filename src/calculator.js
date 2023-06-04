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

class Parser {
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

class Calculator {
  constructor(parser) {
    this.parser = parser;
  }

  visit(node) {
    if (node.constructor.name === 'BinOp') {
      return this.operatorNode(node);
    } else if (node.constructor.name === 'Num') {
      return this.numberNode(node);
    } else if (node.constructor.name === 'UnaryOp') {
      return this.unaryNode(node);
    } else {
      console.log(node);
      throw new Error('Parse Error');
    }
  }

  operatorNode(node) {
    if (node.op.type === TokenType.MUL) {
      return this.visit(node.left) * this.visit(node.right);
    } else if (node.op.type === TokenType.DIV) {
      return this.visit(node.left) / this.visit(node.right);
    } else if (node.op.type === TokenType.PLUS) {
      return this.visit(node.left) + this.visit(node.right);
    } else if (node.op.type === TokenType.MINUS) {
      return this.visit(node.left) - this.visit(node.right);
    }
  }

  numberNode(node) {
    return node.value;
  }

  unaryNode(node) {
    const op = node.op.type;
    if (op === TokenType.PLUS) {
      return +this.visit(node.expr);
    } else if (op === TokenType.MINUS) {
      return -this.visit(node.expr);
    }
  }

  calc() {
    const tree = this.parser.parse();
    if (tree === null) {
      return '';
    }
    return this.visit(tree);
  }
}
