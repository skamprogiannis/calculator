function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(o, x, y) {
  if (o === "+") return add(x, y);
  if (o === "-") return subtract(x, y);
  if (o === "*") return multiply(x, y);
  if (o === "/") return divide(x, y);
}

display = document.querySelector(".display");
let firstOperand = '';
let secondOperand = '';

numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    display.textContent = display.textContent + number.textContent;
    firstOperand += parseFloat(number.textContent);
  });
});

allClear = document.querySelector("#ac");
allClear.addEventListener("click", () => {
    display.textContent = ''
    firstOperand = ''
    secondOperand = ''
})