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
        <button onClick={alert}>Whoop</button>
        <button onClick={asdf}>Asdf</button>
        <button onClick={() => alert2({ text: "henning" })}>Qwer</button>
      </header>
    </div>
  );
}

export default App;
