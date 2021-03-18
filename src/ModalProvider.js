import React from "react";

import { scrollLock } from "./util";
import ModalContext from "./ModalContext";

export default function ModalProvider({ children, portal }) {
  const ref = React.useRef();
  const [modals, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "add":
        return [].concat(state, action.modal);
      case "remove":
        return state.filter((m) => m !== action.modal);
      default:
        return state;
    }
  }, []);

  // TODO: support multiple modals
  const modal = modals[modals.length - 1];

  React.useEffect(() => {
    if (modal) return scrollLock(ref.current);
  }, [modal]);

  return React.createElement(
    ModalContext.Provider,
    { value: dispatch },
    React.createElement("div", { ref }, children),
    modal && (typeof portal === "function" ? portal(modal) : modal)
  );
}
