import { useReducer } from "react";
import "./App.css";
import reducer, { defaultvalue } from "./reducer/reducer";
import OperationButton from "./components/OperationButton";
import DigitButton from "./components/DigitButton";

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

export function evaluate({ curOperand, prevOperand, operation }) {
  const prev = parseFloat(prevOperand);
  const cur = parseFloat(curOperand);
  if (isNaN(prev) || isNaN(cur)) return "";
  let compute = "";
  switch (operation) {
    case "+":
      compute = prev + cur;
      break;
    case "-":
      compute = prev - cur;
      break;
    case "*":
      compute = prev * cur;
      break;
    case "÷":
      compute = prev / cur;
      break;
    case "%":
      compute = prev % cur;
      break;
  }
  return compute.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [state2, dispatch] = useReducer(reducer, defaultvalue);

  const output = [
    formatOperand(state2?.prevOperand),
    state2?.operation,
    formatOperand(state2?.curOperand),
  ];

  return (
    <div className="calculator-grid">
      <div className="output">
        {output.every((item) => !item) ? 0 : output.join(" ")}
      </div>
      <div className="buttons">
        <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          DEL
        </button>
        <OperationButton operation="%" dispatch={dispatch} />
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="−" dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
