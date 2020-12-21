//src/background.ts

import { MessageType } from "./types";

const sendSnowStatus = (snowing: boolean) => {
  const message = { type: "SNOW_STATUS", snowing };
  const giveaway = {type: "START_GIVAWAY"};

  //send message to popup
  chrome.runtime.sendMessage(message);

  //send message to every active tab
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message);
        chrome.tabs.sendMessage(tab.id, giveaway)
      }
    });
  });
};

const startGiveaway = () => {
  const giveaway = {type: "START_GIVEAWAY"};

  chrome.runtime.sendMessage(giveaway);

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, giveaway)
      }
    });
  });

}

let snowing = false;

//Get locally stored value
chrome.storage.local.get("snowing", (res) => {
  if (res["snowing"]) {
    snowing = true;
  } else {
    snowing = false;
  }
});

chrome.runtime.onMessage.addListener((message: any) => {
  switch (message.type) {
    case "REQ_SNOW_STATUS":
      console.log("bg req snow status");
      sendSnowStatus(snowing);
      break;
    case "TOGGLE_SNOW":
      snowing = message.snowing;
      chrome.storage.local.set({ snowing: snowing });
      console.log("bg toggle snow status");
      sendSnowStatus(snowing);
      break;
    case "START_GIVEAWAY":
      console.log("From background .ts giveaway");
      startGiveaway();
    default:
      break;
  }
});