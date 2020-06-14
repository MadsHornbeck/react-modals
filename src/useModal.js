import React from "react";
import ModalContext from "./ModalContext";
import useFocus from "./useFocus";
import useAria from "./useAria";
import useCloseOnKeys from "./useCloseOnKeys";

export default function useModal(component) {
  const dispatch = React.useContext(ModalContext);
  return React.useCallback(
    (props) => {
      // Naive way of detecting events, might need to be refined.
      const p = props && props.nativeEvent ? undefined : props;
      let modal;
      return new Promise((resolve) => {
        modal = React.createElement(Modal, { props: p, resolve, component });
        dispatch({ type: "add", modal });
      }).finally(() => {
        dispatch({ type: "remove", modal });
      });
    },
    [component, dispatch]
  );
}

function Modal({ component, props = {}, resolve }) {
  const ariaLabel = props.ariaLabel || component.props.ariaLabel;
  const [closeOnKeys, setCloseOnKeys] = React.useState(
    props.closeOnKeys ||
      component.props.closeOnKeys ||
      component.type.closeOnKeys ||
      component.type.render.closeOnKeys
  );
  const ref = React.useRef();
  const aria = useAria(ariaLabel);
  useCloseOnKeys(resolve, closeOnKeys);
  useFocus(ref);
  return React.cloneElement(component, {
    ...props,
    aria,
    ref,
    resolve,
    setCloseOnKeys,
  });
}
