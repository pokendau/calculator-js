function add(a, b) {
  return a + b;
}

function subtract(min, sub) {
  return min - sub;
}

function multiply(a, b) {
  return a * b;
}

function divide(dividend, divisor) {
  return dividend / divisor;
}

function operate(a, b, op) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}
