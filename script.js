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

numbers = document.querySelectorAll(".number");
display = document.querySelector(".display");
let firstOperand = '';
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    display.textContent = display.textContent + number.textContent;
    firstOperand += number.textContent;
  });
});
