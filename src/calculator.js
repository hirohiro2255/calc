import { TokenType, isDigit } from './utils';
import Lexer from './lexer';
import Parser from './parser';
import Token from './token';

export default class Calculator {
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
    }
    // } else {
    //   console.log(node);
    //   throw new Error('Parse Error');
    // }
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
