import logo from "./logo.svg";
import "./App.css";

import { ConnectWallet, setNickname } from "./components/Contract";

function App() {
  return (
    <div className="App">
        <ConnectWallet/>

        <button onClick={() => setNickname("marwan sucks")}>X</button>
    </div>
  );
}

export default App;
