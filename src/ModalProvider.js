import React from "react";
import ReactDOM from "react-dom";
import { useScrollLock } from "@hornbeck/scroll-lock";

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

  useScrollLock(modal);

  React.useEffect(() => {
    if (modal) {
      const el = ref.current;
      el.setAttribute("aria-hidden", "true");
      return () => {
        el.removeAttribute("aria-hidden");
      };
    }
  }, [modal]);

  return React.createElement(
    ModalContext.Provider,
    { value: dispatch },
    children,
    !ref.current &&
      React.createElement("div", {
        ref: (r) => {
          if (!ref.current) ref.current = r;
          else ref.current = ref.current.parentNode;
        },
        style: { display: "none" },
      }),
    modal &&
      (typeof portal === "function"
        ? portal(modal)
        : ReactDOM.createPortal(modal, document.body))
  );
}
