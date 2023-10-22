import { React } from "react";
import { StacksDevnet } from "@stacks/network";
import { AppConfig, showConnect, UserSession, openContractCall } from "@stacks/connect";
import {
  callReadOnlyFunction,
  AnchorMode,
  stringUtf8CV,
  uintCV,
  principalCV,
  PostConditionMode,
} from '@stacks/transactions';

export const appDetails = {
  name: "Bubble",
  icon: window.location.origin + "/logo512.png",
};
const deployer = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails,
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
      <button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </button>
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
  return (await readCall("get-nickname", [principalCV(principal)])).value;
}

export async function getThreadCount() {
  return (await readCall("get-thread-count", [])).value;
}

export async function getThread(threadID) {
  return (await readCall("get-thread", [uintCV(threadID)])).value.data;
}

export async function getPost(threadID, postID) {
  return (await readCall("get-post", [uintCV(threadID), uintCV(postID)])).value;
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
    network: new StacksDevnet(),
    contractAddress: deployer,
    contractName: "bubble",
    functionName: func,
    functionArgs: args,
    senderAddress: getUserAddress(),
  });
}
