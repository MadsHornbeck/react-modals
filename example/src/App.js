import React from "react";
import "./App.css";
import { useModal } from "@hornbeck/react-modals";
import Alert from "./modals/Alert";
import Confirm from "./modals/Confirm";

function App() {
  const alert = useModal(<Alert text="Santa is not real!" />);

  const confirm = useModal(<Confirm text="Do you want to confirm this?" />);

  const modalChain = async () => {
    if (await confirm({ text: "Do you want to know a secret?" })) {
      await alert();
      if (
        await confirm({
          text: "Do you still want to send the letter?",
        })
      ) {
        console.log("Letter has been sent");
      }
    }
  };

  return (
    <div className="App" style={{ height: "200vh" }}>
      <header className="App-header">
        <h1>@hornbeck/react-modals</h1>
        <button onClick={alert}>Alert</button>
        <button onClick={() => alert({ text: "Different text" })}>
          Alert with text overwrite
        </button>
        <button onClick={confirm}>Confirm</button>
        <button onClick={modalChain}>Modal chain</button>
      </header>
    </div>
  );
}

export default App;
