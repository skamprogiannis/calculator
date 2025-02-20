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
  if (o === "×") return multiply(x, y);
  if (o === "÷") return divide(x, y);
  if (o === "") return x;
}

function clearAll() {
  display.textContent = "";
  firstOperand = "";
  secondOperand = "";
  operator = "";
}

function getResult() {
  firstOperand = operate(
    operator,
    Number(firstOperand),
    Number(secondOperand)
  ).toString();
  display.textContent = firstOperand;
  secondOperand = "";
  operator = "";
}

display = document.querySelector(".display");
let firstOperand = "";
let secondOperand = "";
let operator = "";
let resultFlag = false;

numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((number) => {
  number.addEventListener("click", () => {
    if (resultFlag) {
      clearAll();
      resultFlag = false;
    }

    if (firstOperand !== "" && operator !== "") {
      display.textContent += number.textContent;
      secondOperand += number.textContent;
    } else {
      display.textContent = display.textContent + number.textContent;
      firstOperand += number.textContent;
    }
  });
});

allClearButton = document.querySelector("#ac");
allClearButton.addEventListener("click", () => {
  clearAll();
});

operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    if (firstOperand !== "" && secondOperand !== "") {
      getResult();
      operator = operatorButton.innerText;
      display.textContent += operatorButton.innerText;
    } else if (firstOperand !== "" && secondOperand === "" && operator === "") {
      display.textContent += operatorButton.innerText;
      operator = operatorButton.innerText;
      resultFlag = false;
    }
    //if an operator has already been pressed, change it to the last one pressed
    if (operator !== "") {
      display.textContent =
        display.textContent.slice(0, display.textContent.length - 1) +
        operatorButton.innerText;
      operator = operatorButton.innerText;
    }
  });
});

resultButton = document.querySelector("#result");
resultButton.addEventListener("click", () => {
  getResult();
  resultFlag = true;
});
