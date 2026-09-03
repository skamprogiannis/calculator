import { Calculator } from "./calculator.js";

const calculator = new Calculator();
const display = document.querySelector("#display");
const expression = document.querySelector("#expression");
const keys = [...document.querySelectorAll(".key")];
const operatorKeys = [...document.querySelectorAll("[data-operator]")];

function render() {
  const state = calculator.getState();

  display.textContent = state.display;
  expression.textContent = state.expression || "\u00a0";
  display.classList.toggle("display__value--error", state.error);

  operatorKeys.forEach((key) => {
    key.classList.toggle(
      "key--selected",
      state.operator === key.dataset.operator && state.waitingForOperand,
    );
  });
}

function runAction(key) {
  if (key.dataset.digit !== undefined) {
    calculator.inputDigit(key.dataset.digit);
  } else if (key.dataset.operator) {
    calculator.chooseOperator(key.dataset.operator);
  } else {
    const actions = {
      backspace: () => calculator.backspace(),
      clear: () => calculator.clear(),
      decimal: () => calculator.inputDecimal(),
      equals: () => calculator.equals(),
      percentage: () => calculator.percentage(),
      sign: () => calculator.toggleSign(),
    };

    actions[key.dataset.action]?.();
  }

  render();
}

function findKey(pressedKey) {
  if (/^\d$/.test(pressedKey)) {
    return document.querySelector(`[data-digit="${pressedKey}"]`);
  }

  if (pressedKey === "=" || pressedKey === "Enter") {
    return document.querySelector('[data-action="equals"]');
  }

  if (pressedKey.toLowerCase() === "c") {
    return document.querySelector('[data-action="clear"]');
  }

  return keys.find((key) => key.dataset.key === pressedKey);
}

function showKeyboardPress(key) {
  key.classList.add("key--keyboard-active");
  window.setTimeout(() => key.classList.remove("key--keyboard-active"), 120);
}

keys.forEach((key) => {
  key.addEventListener("click", () => runAction(key));
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  const key = findKey(event.key);
  if (!key) return;

  event.preventDefault();
  runAction(key);
  showKeyboardPress(key);
});

render();
