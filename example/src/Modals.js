import React from "react";
import { useModal } from "@hornbeck/react-modals";
import "./Modal.css";

const closeOnKeys = [
  "Escape",
  [
    "e",
    () => {
      console.log("Closing in 1 second");
      return new Promise((r) => {
        setTimeout(() => r("Promise close"), 1000);
      });
    },
  ],
  ["q", true],
];

const Modal = React.forwardRef(({ children, handleClose, aria }, ref) => (
  <div className="modal">
    <div className="overlay" onClick={handleClose}></div>
    <div className="content" ref={ref} {...aria.attributes}>
      {children}
    </div>
  </div>
));
Modal.displayName = "Modal";

const Alert = React.forwardRef(({ resolve, text, aria }, ref) => {
  return (
    <Modal
      ref={ref}
      aria={aria}
      resolve={resolve}
      handleClose={() => resolve()}
    >
      <div style={{ height: "100vh" }}>
        <h3 id={aria.labelledby}>Title</h3>
        <p>{text}</p>
        <button onClick={resolve}>Okay</button>
      </div>
    </Modal>
  );
});
Alert.displayName = "Alert";

export const useAlert = (text) =>
  useModal(<Alert text={text} closeOnKeys={closeOnKeys} />);

const Confirm = React.forwardRef(({ resolve, text, aria }, ref) => {
  const openConfirm = useConfirm("Test");
  return (
    <Modal
      ref={ref}
      aria={aria}
      resolve={resolve}
      handleClose={() => resolve(false)}
    >
      <p>{text}</p>
      <button onClick={() => resolve(true)}>Okay</button>
      <button onClick={() => openConfirm().then(console.log)}>
        OpenConfirm
      </button>
      <button onClick={() => resolve(false)}>Cancel</button>
    </Modal>
  );
});
Confirm.displayName = "Confirm";

export const useConfirm = (text) => useModal(<Confirm text={text} />);
