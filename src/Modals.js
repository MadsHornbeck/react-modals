import React from "react";
import { useFocus, useCloseOnKeys } from "./util";
import { useModal } from "./modals";

function Modal({ children, handleClose, resolve }) {
  const ref = React.useRef();
  useFocus(ref);
  useCloseOnKeys(resolve, [
    [
      "Escape",
      () =>
        new Promise((r) => {
          setTimeout(() => r("FISK"), 1000);
        }),
    ],
    ["Enter", true],
    "Shift",
  ]);
  const [a, s] = React.useState(true);
  return (
    <div ref={ref} className="modal">
      <div className="overlay" onClick={handleClose}></div>
      <div className="content">
        <button onClick={() => s((e) => !e)}>OST {`${a}`}</button>
        <div tabIndex="0">TAB</div>
        <div tabIndex="asdf">No TAB</div>
        <a href="#">Anchor</a>
        {children}
      </div>
    </div>
  );
}

export function Alert({ resolve, text }) {
  return (
    <Modal resolve={resolve} handleClose={() => resolve()}>
      <div>
        {text}
        <button onClick={resolve}>Okay</button>
      </div>
    </Modal>
  );
}

export function Confirm({ resolve, text }) {
  return (
    <Modal resolve={resolve} handleClose={() => resolve(false)}>
      <div>
        {text}
        <button onClick={() => resolve(true)}>Okay</button>
        <button onClick={() => resolve(false)}>Cancel</button>
      </div>
    </Modal>
  );
}
