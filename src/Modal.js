import React from "react";

import "./Modal.css";
import useAria from "./useAria";
import useCloseOnKeys from "./useCloseOnKeys";
import useFocus from "./useFocus";
import { getStatic } from "./util";

function Modal({ children, resolve, props = {} }) {
  const { ariaLabel, overlayClass = "", modalClass = "" } = props;
  const aria = useAria(ariaLabel);
  const ref = useFocus();
  const setCloseOnKeys = useCloseOnKeys({ children, props, resolve });

  const [overlayClose, setOverlayClose] = React.useState(
    () =>
      props.overlayClose || getStatic(children, "overlayClose") || ((r) => r())
  );

  const childProps = {
    ...props,
    aria,
    resolve,
    setCloseOnKeys,
    setOverlayClose,
  };

  return React.createElement(
    "div",
    { className: "modal" },
    React.createElement("div", {
      className: `modal-overlay ${overlayClass}`,
      onClick: () => overlayClose(resolve),
    }),
    React.createElement(
      "div",
      {
        className: `modal-content ${modalClass}`,
        ref,
        ...aria.attributes,
      },
      typeof children === "function"
        ? children(childProps)
        : React.cloneElement(children, childProps)
    )
  );
}

export default Modal;
