import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@hornbeck/react-modals/style.css";
import App from "./App";
import { ModalProvider } from "@hornbeck/react-modals";

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
