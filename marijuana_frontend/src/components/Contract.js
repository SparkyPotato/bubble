import React from "react";
import { AppConfig, AuthDetails, showConnect, UserSession } from "@stacks/connect";
import {
  makeContractCall,
  callReadOnlyFunction,
  broadcastTransaction,
  AnchorMode,
  stringUtf8CV,
  uintCV,
  ClarityValue,
  principalCV,
} from '@stacks/transactions';

const deployer = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
const appDetails = {
  name: "Bubble",
  icon: window.location.origin + "/logo512.png",
};

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails,
    onFinish: () => window.location.reload(),
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

async function contract_call() {}

async function read_call() {}

export function post_render(setUserData) {
  if (userSession.isSignInPending()) {
    userSession.handlePendingSignIn().then((userData) => {
      setUserData(userData);
    });
  } else if (userSession.isUserSignedIn()) {
    setUserData(userSession.loadUserData());
  }
}

export const ConnectWallet = () => {
  if (userSession.isUserSignedIn()) {
    return (
      <div>
        <button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </button>
      </div>
    );
  }

  return (
    <div>
      <button className="Connect" onClick={authenticate}>
        Connect Wallet
      </button>
    </div>
  );
};
