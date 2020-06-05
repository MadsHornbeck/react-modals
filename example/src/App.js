import React from "react";
import "./App.css";
import { useAlert, useConfirm } from "./Modals";

function App() {
  const alert = useAlert("This is an alert");

  const alert2 = useAlert("This is also an alert!");

  const confirm = useConfirm("Do you want to confirm this?");
  const asdf = () => {
    confirm({ text: "This is a different text!" }).then(console.log);
  };

  return (
    <div className="App" style={{ height: "200vh" }}>
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => alert()}>Alert</button>
        <button onClick={() => alert2()}>Another alert</button>
        <button onClick={() => alert2({ text: "Overwrite text" })}>
          Alert with text overwrite
        </button>
        <button onClick={() => confirm()}>Confirm</button>
        <button onClick={asdf}>
          Confirm with text overwrite and log of return
        </button>
      </header>
    </div>
  );
}

export default App;
