import React from "react";

function Alert({ text, resolve, aria }) {
  const handleClose = () => resolve();
  return (
    <>
      <p id={aria.labelledBy}>{text}</p>
      <button onClick={handleClose}>Okay</button>
    </>
  );
}
Alert.overlayClose = (resolve) => resolve();

export default Alert;
