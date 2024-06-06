const screen = document.getElementById("calculator__screen");
const buttons = Array.from(document.getElementsByClassName("number_button"));
const opButtons = Array.from(document.getElementsByClassName("op_button"));
const eqButton = document.getElementById("equal_button");
const acButton = document.getElementById("ac");
const operations = ["+", "-", "*", "/"];

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
  a = parseInt(a);
  b = parseInt(b);
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

function modifyScreen(value) {
  screen.innerHTML = value;
}

buttons.forEach((button) => {
  button.addEventListener("click", (ev) => {
    if (screen.innerHTML == "0") screen.innerHTML = "";
    screen.innerHTML += button.innerHTML;
  });
});

opButtons.forEach((button) => {
  button.addEventListener("click", (ev) => {
    if (screen.innerHTML == "") return;
    screen.innerHTML += button.innerHTML;
  });
});

eqButton.addEventListener("click", (ev) => {
  let result = splitIntoNumsAndOps(screen.innerHTML);
  let { nums, ops } = result;
  screen.innerHTML = calculate(nums, ops);
});

acButton.addEventListener("click", (ev) => {
  screen.innerHTML = "0";
});

function splitIntoNumsAndOps(str) {
  let nums = [];
  let ops = [];

  let before = 0;
  for (let i = 0; i < str.length; i++) {
    if (operations.includes(str[i])) {
      ops.push(str[i]);
      nums.push(str.slice(before, i));
      before = i + 1;
    } else if (i + 1 == str.length) {
      nums.push(str.slice(before, i + 1));
    }
  }
  return {
    nums,
    ops,
  };
}

function calculate(nums, ops) {
  console.log(`The nums are ${nums} and the ops are ${ops}`);
  let result;
  if (ops.length == 0) {
    return nums[0];
  }

  if (ops[0] == "+" || ops[0] == "-") {
    return operate(nums[0], calculate(nums.slice(1), ops.slice(1)), ops[0]);
  }

  if (ops[0] == "*" || ops[0] == "/") {
    let m = [operate(nums[0], nums[1], ops[0])];
    if (nums.slice(2).length == 0) return m[0];
    return calculate(m.concat(nums.slice(2)), ops.slice(1));
  }
}
