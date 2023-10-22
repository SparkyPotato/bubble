import React from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

function authenticate(onConnect) {
  console.log("Authenticating...");
  showConnect({
    appDetails: {
      name: "Stacks React Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      console.log("Finished connecting wallet.");
      onConnect();
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

const ConnectWallet = ({ onConnect }) => {
  console.log("Rendering ConnectWallet...");
  if (userSession.isUserSignedIn()) {
    console.log("User is signed in.");
    onConnect();
    return (
      <div>
        <button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </button>
    
      </div>
    );
  }

  console.log("User is not signed in.");
  return (
    <div>
      <button className="Connect" onClick={() => authenticate(onConnect)}>
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWallet;