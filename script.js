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

numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
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

allClear = document.querySelector("#ac");
allClear.addEventListener("click", () => {
  clearAll();
});

addition = document.querySelector("#addition");
addition.addEventListener("click", () => {
  if (firstOperand !== "" && secondOperand !== "") {
    getResult();
    operator = "+";
    display.textContent += "+";
  } else if (firstOperand !== "" && secondOperand === "" && operator === "") {
    display.textContent += "+";
    operator = "+";
    resultFlag = false;
  }
    //if an operator has already been pressed, change it to the last one pressed
    if (operator !== "") {
        display.textContent = display.textContent.slice(0, display.textContent.length - 1) + "+";
        operator = "+";
    }
});

subtraction = document.querySelector("#subtraction");
subtraction.addEventListener("click", () => {
  if (firstOperand !== "" && secondOperand !== "") {
    getResult();
    operator = "-";
    display.textContent += "-";
  } else if (firstOperand !== "" && secondOperand === "" && operator === "") {
    display.textContent += "-";
    operator = "-";
    resultFlag = false;
  }

  if (operator !== "") {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1) + "-";
    operator = "-";
}
});

division = document.querySelector("#division");
division.addEventListener("click", () => {
  if (firstOperand !== "" && secondOperand !== "") {
    getResult();
    operator = "÷";
    display.textContent += "÷";
  } else if (firstOperand !== "" && secondOperand === "" && operator === "") {
    display.textContent += "÷";
    operator = "÷";
    resultFlag = false;
  }
  if (operator !== "") {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1) + "÷";
    operator = "÷";
}
});

multiplication = document.querySelector("#multiplication");
multiplication.addEventListener("click", () => {
  if (firstOperand !== "" && secondOperand !== "") {
    getResult();
    operator = "×";
    display.textContent += "×";
  } else if (firstOperand !== "" && secondOperand === "" && operator === "") {
    display.textContent += "×";
    operator = "×";
    resultFlag = false;
  }
  if (operator !== "") {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1) + "×";
    operator = "×";
}
});

result = document.querySelector("#result");
result.addEventListener("click", () => {
  getResult();
  resultFlag = true;
});
