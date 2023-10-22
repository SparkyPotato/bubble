import logo from "./logo.svg";
import "./App.css";

import ConnectWallet from "./components/ConnectWallet";
import ContractCallVote from "./components/ContractCallVote";

function App() {
  return (
    <div className="App">
        
        {/* ConnectWallet file: `./src/components/ConnectWallet.js` */}
        <ConnectWallet />

        {/* ContractCallVote file: `./src/components/ContractCallVote.js` */}
        <ContractCallVote />
    </div>
  );
}

export default App;
