import React from "react";
import ReactDOM from "react-dom";

const ModalContext = React.createContext();
ModalContext.displayName = "ModalContext";

const scrollbarWidth = (function () {
  const el = document.createElement("div");
  el.style.position = "absolute";
  el.style.top = "-9999px";
  el.style.overflow = "scroll";
  document.body.appendChild(el);
  const width = el.offsetWidth;
  document.body.removeChild(el);
  return width;
})();

export function useOpenModal(Component) {
  // TODO: potential issues if passed component is changed after being added
  const dispatch = React.useContext(ModalContext);
  return React.useCallback(
    (props) => {
      let modal;
      return new Promise((resolve) => {
        // TODO: maybe find a better name for resolve
        modal = React.cloneElement(Component, { ...props, resolve });
        dispatch({ type: "add", modal });
      }).finally(() => {
        dispatch({ type: "remove", modal });
      });
    },
    [Component, dispatch]
  );
}
export function ModalProvider({ children, portal }) {
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
    if (modal) {
      const padding = Number(
        window.getComputedStyle(document.body)["padding-right"].slice(0, -2)
      );
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${padding + scrollbarWidth}px`;
      ref.current.setAttribute("aria-hidden", "true");
    } else {
      document.body.style.overflow = "auto";
      // TODO: restore previous styles if any were set
      document.body.style.paddingRight = "";
      ref.current.removeAttribute("aria-hidden");
    }
  }, [modal]);

  return (
    <ModalContext.Provider value={dispatch}>
      {/** TODO: figure out if there is a better way of handling ref / aria-hidden */}
      <div ref={ref}>{children}</div>
      {modal && <Portal portal={portal}>{modal}</Portal>}
    </ModalContext.Provider>
  );
}

function Portal({ portal, children }) {
  return portal ? ReactDOM.createPortal(children, portal) : children;
}
