import React from "react";

import "./Modal.css";
import useAria from "./useAria";
import useCloseOnKeys from "./useCloseOnKeys";
import useFocus from "./useFocus";
import { getStatic } from "./util";

function Modal({ children, style, resolve, props = {} }) {
  const ariaLabel =
    props.ariaLabel || (children.props && children.props.ariaLabel);
  const aria = useAria(ariaLabel);
  const setCloseOnKeys = useCloseOnKeys({ children, props, resolve });
  const ref = useFocus();

  const [overlayClose, setOverlayClose] = React.useState(
    () =>
      props.overlayClose || getStatic(children, "overlayClose") || ((r) => r())
  );

  const { overlayClass = "", modalClass = "" } = props;

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
        style,
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
