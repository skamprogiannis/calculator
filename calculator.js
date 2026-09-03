const OPERATORS = new Set(["+", "−", "×", "÷"]);
const MAX_INPUT_DIGITS = 12;

export function calculate(left, right, operator) {
  const operations = {
    "+": (x, y) => x + y,
    "−": (x, y) => x - y,
    "×": (x, y) => x * y,
    "÷": (x, y) => (y === 0 ? null : x / y),
  };

  const result = operations[operator]?.(left, right);
  if (result === null || !Number.isFinite(result)) return null;

  return Number.parseFloat(result.toPrecision(12));
}

function formatNumber(value) {
  if (Object.is(value, -0)) return "0";
  return value.toString();
}

function digitCount(value) {
  return value.replace(/[-.]/g, "").length;
}

export class Calculator {
  constructor() {
    this.clear();
  }

  clear() {
    this.display = "0";
    this.expression = "";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.justEvaluated = false;
    this.error = false;
    return this.getState();
  }

  inputDigit(digit) {
    if (!/^\d$/.test(digit)) return this.getState();
    if (this.error) this.clear();

    if (this.waitingForOperand || this.justEvaluated) {
      if (this.justEvaluated) this.expression = "";
      this.display = digit;
      this.waitingForOperand = false;
      this.justEvaluated = false;
      return this.getState();
    }

    if (digitCount(this.display) >= MAX_INPUT_DIGITS) return this.getState();
    this.display = this.display === "0" ? digit : this.display + digit;
    return this.getState();
  }

  inputDecimal() {
    if (this.error) this.clear();

    if (this.waitingForOperand || this.justEvaluated) {
      if (this.justEvaluated) this.expression = "";
      this.display = "0.";
      this.waitingForOperand = false;
      this.justEvaluated = false;
    } else if (!this.display.includes(".")) {
      this.display += ".";
    }

    return this.getState();
  }

  chooseOperator(nextOperator) {
    if (!OPERATORS.has(nextOperator) || this.error) return this.getState();

    if (this.operator && this.waitingForOperand) {
      this.operator = nextOperator;
      this.expression = `${formatNumber(this.firstOperand)} ${nextOperator}`;
      return this.getState();
    }

    const inputValue = Number(this.display);

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = calculate(this.firstOperand, inputValue, this.operator);
      if (result === null) return this.setDivisionError();

      this.display = formatNumber(result);
      this.firstOperand = result;
    }

    this.operator = nextOperator;
    this.expression = `${this.display} ${nextOperator}`;
    this.waitingForOperand = true;
    this.justEvaluated = false;
    return this.getState();
  }

  equals() {
    if (
      this.error ||
      this.operator === null ||
      this.firstOperand === null ||
      this.waitingForOperand
    ) {
      return this.getState();
    }

    const rightOperand = Number(this.display);
    const previousExpression = `${formatNumber(this.firstOperand)} ${this.operator} ${this.display} =`;
    const result = calculate(this.firstOperand, rightOperand, this.operator);
    if (result === null) return this.setDivisionError();

    this.display = formatNumber(result);
    this.expression = previousExpression;
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.justEvaluated = true;
    return this.getState();
  }

  toggleSign() {
    if (this.error || this.waitingForOperand || Number(this.display) === 0) {
      return this.getState();
    }

    this.display = formatNumber(Number(this.display) * -1);
    if (this.justEvaluated) {
      this.expression = "";
      this.justEvaluated = false;
    }
    return this.getState();
  }

  percentage() {
    if (this.error || this.waitingForOperand) return this.getState();

    this.display = formatNumber(
      Number.parseFloat((Number(this.display) / 100).toPrecision(12)),
    );
    if (this.justEvaluated) {
      this.expression = "";
      this.justEvaluated = false;
    }
    return this.getState();
  }

  backspace() {
    if (this.error) return this.clear();
    if (this.waitingForOperand) return this.getState();

    if (this.justEvaluated) {
      this.expression = "";
      this.justEvaluated = false;
    }

    const shortened = this.display.slice(0, -1);
    this.display = shortened === "" || shortened === "-" ? "0" : shortened;
    return this.getState();
  }

  getState() {
    return {
      display: this.display,
      error: this.error,
      expression: this.expression,
      operator: this.operator,
      waitingForOperand: this.waitingForOperand,
    };
  }

  setDivisionError() {
    this.display = "Error";
    this.expression = "Cannot divide by zero";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.justEvaluated = false;
    this.error = true;
    return this.getState();
  }
}
