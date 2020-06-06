import React from "react";
import "./Modal.css";

function Modal({ children, handleClose, aria }, ref) {
  return (
    <div className="modal">
      <div className="overlay" onClick={handleClose}></div>
      <div className="content" ref={ref} {...aria.attributes}>
        {children}
      </div>
    </div>
  );
}

export default React.forwardRef(Modal);
