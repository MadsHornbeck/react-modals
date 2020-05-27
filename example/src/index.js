import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ModalProvider } from "react-modal-promise";

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider portal={document.body}>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
