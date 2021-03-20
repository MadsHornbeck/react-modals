import React from "react";
import "./Modal.css";

function Modal(
  { aria, children, className = "", handleClose, overlayClass = "", style },
  ref
) {
  return React.createElement(
    "div",
    { className: "modal" },
    React.createElement("div", {
      className: `modal-overlay ${overlayClass}`,
      onClick: handleClose,
    }),
    React.createElement(
      "div",
      {
        className: `modal-content ${className}`,
        style,
        ref,
        ...aria.attributes,
      },
      children
    )
  );
}

export default React.forwardRef(Modal);
