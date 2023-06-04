## Integers (grammartically)

INTEGERS === ["+" | "-"], UNSIGNED_INTEGERS.
UNSIGNED_INTEGERS === NUMBERS | NON_ZERO_NUMBERS, { NUMBERS }.
NUMBERS === '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0'
NON_ZERO_NUMBERS === '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'.

## Expression

EXPRESSION ::= TERM | EXPRESSION '+' TERM | EXPRESSION '-' TERM
TERM ::= FACTOR | TERM 'x' FACTOR | TERM '/' FACTOR
FACTOR ::= NUMBER | '(' EXPRESSION ')'

FACTOR is the highest proprity to be calculated.
TERM the second.

## Unary Operator

EXPRESSION = TERM { ('+' | '-'), TERM }.
TERM = FACTOR { ('x' | '/'), FACTOR }.
FACTOR = NUMBER | ('+' | '-'), FACTOR | '(' EXPRESSION ')'.
