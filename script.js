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
let firstOperand = "";
let secondOperand = "";
let operator = "";

numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (firstOperand !== "" && operator !== "") {
      display.textContent += number.textContent;
      secondOperand += number.textContent;
    } else {
      display.textContent = display.textContent + number.textContent;
      firstOperand += number.textContent;
    }
  });
});

allClear = document.querySelector("#ac");
allClear.addEventListener("click", () => {
  display.textContent = "";
  firstOperand = "";
  secondOperand = "";
  operator = "";
});

addition = document.querySelector("#addition");
addition.addEventListener("click", () => {
  if (firstOperand !== "" && secondOperand !== "") {
    firstOperand = add(firstOperand, secondOperand);
    secondOperand = "";
    display.textContent = firstOperand.toString();
  } else if (firstOperand !== "" && secondOperand === "" && operator === "") {
    display.textContent += "+";
    operator = "+";
  }
});

result = document.querySelector("#result");
result.addEventListener("click", () => {
  firstOperand = operate(operator, Number(firstOperand), Number(secondOperand)).toString();
  display.textContent = firstOperand;
  secondOperand = "";
});
