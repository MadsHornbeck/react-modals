import React from "react";
import Modal from "./Modal";

function Alert({ text, resolve, aria }, ref) {
  const handleClose = () => resolve();
  return (
    <Modal ref={ref} handleClose={handleClose} aria={aria}>
      <p>{text}</p>
      <button onClick={handleClose}>Okay</button>
    </Modal>
  );
}

export default React.forwardRef(Alert);
