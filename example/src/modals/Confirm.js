import React from "react";

function Confirm({ text, resolve }, ref) {
  return (
    <>
      <p ref={ref}>{text}</p>
      <button onClick={() => resolve(true)}>Okay</button>
      <button onClick={() => resolve(false)}>Cancel</button>
    </>
  );
}
Confirm.closeOnKeys = [["Escape", false]];
Confirm.overlayClose = (resolve) => resolve(false);

export default React.memo(React.forwardRef(Confirm));
