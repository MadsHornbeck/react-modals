import React from "react";
import { useOpenModal, useModal, useAria } from "@hornbeck/react-modals";
import "./Modal.css";

const closeOnKeys = [
  "Escape",
  [
    "e",
    () => {
      console.log("Closing in 1 second");
      return new Promise((r) => {
        setTimeout(() => r("FISK"), 1000);
      });
    },
  ],
  ["q", true],
];

function Modal({ children, handleClose, resolve, aria }) {
  const ref = useModal({ resolve, closeOnKeys });
  return (
    <div className="modal">
      <div className="overlay" onClick={handleClose}></div>
      <div className="content" ref={ref} {...aria.attributes}>
        {children}
      </div>
    </div>
  );
}

function Alert({ resolve, text }) {
  const aria = useAria("Alert");
  return (
    <Modal aria={aria} resolve={resolve} handleClose={() => resolve()}>
      <div style={{ height: "100vh" }}>
        <h3 id={aria.labelledby}>Title</h3>
        <p>{text}</p>
        <button onClick={resolve}>Okay</button>
      </div>
    </Modal>
  );
}
export const useAlert = (text) => useOpenModal(<Alert text={text} />);

function Confirm({ resolve, text }) {
  const aria = useAria("Confirm");
  return (
    <Modal aria={aria} resolve={resolve} handleClose={() => resolve(false)}>
      <p>{text}</p>
      <button onClick={() => resolve(true)}>Okay</button>
      <button onClick={() => resolve(false)}>Cancel</button>
    </Modal>
  );
}

export const useConfirm = (text) => useOpenModal(<Confirm text={text} />);
