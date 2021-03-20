import React from "react";
import { Modal } from "@hornbeck/react-modals";

function Confirm({ text, resolve, aria }, ref) {
  const handleClose = () => resolve(false);
  return (
    <Modal ref={ref} handleClose={handleClose} aria={aria}>
      <p>{text}</p>
      <button onClick={() => resolve(true)}>Okay</button>
      <button onClick={() => resolve(false)}>Cancel</button>
    </Modal>
  );
}
Confirm.closeOnKeys = [["Escape", false]];

export default React.forwardRef(Confirm);
