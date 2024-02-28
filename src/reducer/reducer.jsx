import { evaluate, ACTIONS } from "../App";
export default function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT: {
      if (payload.digit === "0" && state.curOperand === "0") return state;
      if (state.overwrite) {
        return {
          ...state,
          curOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "." && state.curOperand.includes(".")) return state;

      return {
        ...state,
        curOperand: `${state.curOperand || ""}${payload.digit}`,
      };
    }

    case ACTIONS.CHOOSE_OPERATION: {
      if (state.curOperand == null && state.prevOperand == null) return state;
      if (state.prevOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.curOperand,
          curOperand: null,
        };
      }
      if (state.curOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        curOperand: null,
      };
    }

    case ACTIONS.EVALUATE: {
      if (
        state.operation == null ||
        state.curOperand == null ||
        state.prevOperand == null
      )
        return state;

      return {
        ...state,
        overwrite: true,
        prevOperand: null,
        operation: null,
        curOperand: evaluate(state),
      };
    }

    case ACTIONS.DELETE_DIGIT: {
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          curOperand: null,
        };
      }
      if (state.curOperand == null) return state;
      if (state.curOperand.length === 1) {
        return {
          ...state,
          curOperand: null,
        };
      }
      return {
        ...state,
        curOperand: state.curOperand.slice(0, -1),
      };
    }

    case ACTIONS.CLEAR:
      return defaultvalue;
    default:
      return state;
  }
}

export const defaultvalue = {
  curOperand: null,
  prevOperand: null,
  operation: "",
  overwrite: false,
};
