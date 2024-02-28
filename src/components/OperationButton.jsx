import { ACTIONS } from "../App.jsx";

// eslint-disable-next-line react/prop-types
export default function DigitButton({ dispatch, operation }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
