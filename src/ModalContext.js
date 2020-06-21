import React from "react";

const ModalContext = React.createContext(() => {
  throw "useModal used outside of modal context.\
 Add ModalProvider to your component tree.";
});
ModalContext.displayName = "ModalContext";

export default ModalContext;
