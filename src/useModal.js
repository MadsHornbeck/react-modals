import React from "react";
import ModalContext from "./ModalContext";
import useFocus from "./useFocus";
import useAria from "./useAria";
import useCloseOnKeys from "./useCloseOnKeys";

export default function useModal(component) {
  const dispatch = React.useContext(ModalContext);
  return React.useCallback(
    (props) => {
      let modal;
      return new Promise((resolve) => {
        // TODO: maybe find a better name for resolve
        modal = React.createElement(Modal, { props, resolve, component });
        dispatch({ type: "add", modal });
      }).finally(() => {
        // TODO: make sure there isn't a memory leak related to the resolve function
        dispatch({ type: "remove", modal });
      });
    },
    [component, dispatch]
  );
}

function Modal({ component, props = {}, resolve }) {
  const ariaLabel = component.props.ariaLabel || props.ariaLabel;
  const closeOnKeys = component.props.closeOnKeys || props.closeOnKeys;
  const ref = React.useRef();
  const aria = useAria(ariaLabel);
  useCloseOnKeys(resolve, closeOnKeys);
  useFocus(ref);
  return React.cloneElement(component, { ...props, aria, resolve, ref });
}
