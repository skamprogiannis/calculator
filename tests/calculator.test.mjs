import assert from "node:assert/strict";
import test from "node:test";

import { calculate, Calculator } from "../calculator.js";

function enter(calculator, value) {
  for (const character of value) {
    if (character === ".") calculator.inputDecimal();
    else calculator.inputDigit(character);
  }
}

test("performs all supported operations", () => {
  assert.equal(calculate(7, 5, "+"), 12);
  assert.equal(calculate(7, 5, "−"), 2);
  assert.equal(calculate(7, 5, "×"), 35);
  assert.equal(calculate(10, 4, "÷"), 2.5);
});

test("normalizes floating-point artifacts", () => {
  assert.equal(calculate(0.1, 0.2, "+"), 0.3);
});

test("enters multi-digit decimal values", () => {
  const calculator = new Calculator();
  enter(calculator, "12.34");

  assert.equal(calculator.getState().display, "12.34");
});

test("evaluates an expression", () => {
  const calculator = new Calculator();
  enter(calculator, "12");
  calculator.chooseOperator("+");
  enter(calculator, "8");
  calculator.equals();

  assert.deepEqual(calculator.getState(), {
    display: "20",
    error: false,
    expression: "12 + 8 =",
    operator: null,
    waitingForOperand: false,
  });
});

test("chains operations through intermediate results", () => {
  const calculator = new Calculator();
  enter(calculator, "5");
  calculator.chooseOperator("+");
  enter(calculator, "3");
  calculator.chooseOperator("×");
  enter(calculator, "2");
  calculator.equals();

  assert.equal(calculator.getState().display, "16");
});

test("replaces an operator before the second operand", () => {
  const calculator = new Calculator();
  enter(calculator, "9");
  calculator.chooseOperator("+");
  calculator.chooseOperator("÷");

  assert.equal(calculator.getState().expression, "9 ÷");
  assert.equal(calculator.getState().operator, "÷");
});

test("reports division by zero and recovers on numeric input", () => {
  const calculator = new Calculator();
  enter(calculator, "9");
  calculator.chooseOperator("÷");
  calculator.inputDigit("0");
  calculator.equals();

  assert.equal(calculator.getState().display, "Error");
  assert.equal(calculator.getState().expression, "Cannot divide by zero");

  calculator.inputDigit("4");
  assert.equal(calculator.getState().display, "4");
  assert.equal(calculator.getState().error, false);
});

test("converts a value to a percentage without breaking decimals", () => {
  const calculator = new Calculator();
  enter(calculator, "25");
  calculator.percentage();
  calculator.inputDecimal();

  assert.equal(calculator.getState().display, "0.25");
});

test("toggles the sign of non-zero values", () => {
  const calculator = new Calculator();
  enter(calculator, "42");
  calculator.toggleSign();
  assert.equal(calculator.getState().display, "-42");
  calculator.toggleSign();
  assert.equal(calculator.getState().display, "42");
});

test("removes the most recent digit", () => {
  const calculator = new Calculator();
  enter(calculator, "123");
  calculator.backspace();
  calculator.backspace();
  calculator.backspace();

  assert.equal(calculator.getState().display, "0");
});

test("starts a fresh expression after a result", () => {
  const calculator = new Calculator();
  enter(calculator, "3");
  calculator.chooseOperator("+");
  calculator.inputDigit("2");
  calculator.equals();
  calculator.inputDigit("7");

  assert.equal(calculator.getState().display, "7");
  assert.equal(calculator.getState().expression, "");
});

test("limits direct input to twelve digits", () => {
  const calculator = new Calculator();
  enter(calculator, "123456789012345");

  assert.equal(calculator.getState().display, "123456789012");
});
