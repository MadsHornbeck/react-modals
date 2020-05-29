import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ModalProvider } from "@hornbeck/react-modals";

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider portal={(m) => ReactDOM.createPortal(m, document.body)}>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
