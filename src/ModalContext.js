import React from "react";

const ModalContext = React.createContext(() => {
  throw "useOpenModal used outside of modal context.\
 Add ModalProvider to your component tree.";
});
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

  // TODO: Move this to it's own hook
  React.useEffect(() => {
    if (modal) {
      const { body } = document;
      const prevOverflow = body.style.overflow;
      const prevPadding = body.style.paddingRight;

      body.style.overflow = "hidden";
      // TODO: add padding only if scrollbar is present
      const padding = Number(
        window.getComputedStyle(body)["padding-right"].slice(0, -2)
      );
      body.style.paddingRight = `${padding + scrollbarWidth}px`;
      const wrapperRef = ref.current;
      wrapperRef.setAttribute("aria-hidden", "true");

      return () => {
        body.style.overflow = prevOverflow;
        body.style.paddingRight = prevPadding;
        wrapperRef.removeAttribute("aria-hidden");
      };
    }
  }, [modal]);

  return (
    <ModalContext.Provider value={dispatch}>
      {/** TODO: figure out if there is a better way of handling ref / aria-hidden */}
      <div ref={ref}>{children}</div>
      {modal && (typeof portal === "function" ? portal(modal) : modal)}
    </ModalContext.Provider>
  );
}
