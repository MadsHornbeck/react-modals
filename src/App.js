import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useModal } from "./modals";

function App() {
  const alert = useModal(<Alert text="fisk" />);

  const qwer = useModal(<Alert text="qwer" />);

  const zxcv = useModal(<Cheese />);
  const asdf = () => {
    zxcv().then((asdf) => {
      console.log(asdf);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={alert}>Whoop</button>
        <button onClick={asdf}>Asdf</button>
        <button onClick={() => qwer({ text: "henning" })}>qwer</button>
      </header>
    </div>
  );
}

export default App;

function Alert({ resolve, text }) {
  return (
    <div>
      {text}
      <button onClick={resolve}>Okay</button>
    </div>
  );
}

function Cheese({ resolve }) {
  return (
    <div>
      Yes or no?
      <button onClick={() => resolve(true)}>Yes</button>
      <button onClick={() => resolve(false)}>No</button>
    </div>
  );
}
