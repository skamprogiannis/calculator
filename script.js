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
      secondOperand += number.textContent;
      display.textContent += number.textContent;
    } else {
      firstOperand += number.textContent;
      display.textContent += number.textContent;
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
      operator = operatorButton.innerText;
      display.textContent += operator;
      resultFlag = false;
    }
    //if an operator has already been pressed, change it to the last one pressed
    if (operator !== "") {
      operator = operatorButton.innerText;
      display.textContent = display.textContent.slice(0, -1) + operator;
    }
  });
});

resultButton = document.querySelector("#result");
resultButton.addEventListener("click", () => {
  getResult();
  resultFlag = true;
});

plusMinusButton = document.querySelector("#unary");
plusMinusButton.addEventListener("click", () => {
  if (!operator) {
    if (firstOperand[0] !== "-") {
      firstOperand = "-" + firstOperand;
      display.textContent = firstOperand;
    } else {
      firstOperand = firstOperand.slice(1);
      display.textContent = firstOperand;
    }
  }
});

backButton = document.querySelector("#back");
backButton.addEventListener("click", () => {
  if (resultFlag) {
    clearAll();
    resultFlag = false;
  }
  display.textContent = display.textContent.slice(0, -1);
  firstOperand = firstOperand.slice(0, -1);
});
