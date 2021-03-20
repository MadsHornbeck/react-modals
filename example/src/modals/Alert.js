import React from "react";
import { Modal } from "@hornbeck/react-modals";

function Alert({ text, resolve, aria }, ref) {
  const handleClose = () => resolve();
  return (
    <Modal ref={ref} aria={aria} handleClose={handleClose}>
      <p>{text}</p>
      <button onClick={handleClose}>Okay</button>
    </Modal>
  );
}

export default React.forwardRef(Alert);
