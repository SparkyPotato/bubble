import React from "react";
import { StacksDevnet } from "@stacks/network";
import { AppConfig, showConnect, UserSession, openContractCall } from "@stacks/connect";
import {
  callReadOnlyFunction,
  AnchorMode,
  stringUtf8CV,
  uintCV,
  principalCV,
} from '@stacks/transactions';

const deployer = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: "Bubble",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
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
    <button className="Connect" onClick={authenticate}>
      Connect Wallet
    </button>
  );
};

export function setNickname(name, onFinish) {
  contractCall("set-nickname", [stringUtf8CV(name)], onFinish);
}

export function startThread(title, content, onFinish) {
  contractCall("start-thread", [stringUtf8CV(title), stringUtf8CV(content)], onFinish);
}

export function postReply(thread, content, onFinish) {
  contractCall("post-reply", [uintCV(thread), stringUtf8CV(content)], onFinish);
}

export function getUserAddress() {
  return userSession.loadUserData().profile.stxAddress["testnet"];
}

export async function getNickname(principal) {
  return readCall("get-nickname", [principalCV(principal)]);
}

function contractCall(func, args, onFinish) {
  openContractCall({
    network: new StacksDevnet(),
    anchorMode: AnchorMode.Any,
    contractAddress: deployer,
    contractName: "bubble",
    functionName: func,
    functionArgs: args,
    postConditionMode: PostConditionMode.Deny,
    postConditions: [],
    onFinish: onFinish,
  });
}

async function readCall(func, args) {
  return callReadOnlyFunction({
    contractAddress: deployer,
    contractName: "bubble",
    functionName: func,
    functionArgs: args,
    network: new StacksDevnet(),
    senderAddress: getUserAddress(),
  });
}
