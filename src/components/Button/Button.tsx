// src/components/Button/Button.tsx

import * as React from "react";
import { MessageType } from "../../types";
import "./Button.css";

export const Button = () => {
  const [snowing, setSnowing] = React.useState(true);
  const [text, setText] = React.useState<String>("empty.");

  React.useEffect(() => {
    //chrome.runtime.sendMessage({ type: "REQ_SNOW_STATUS" });

    //chrome.runtime.sendMessage({ type: "START_GIVEAWAY" });

    chrome.runtime.onMessage.addListener((message: any) => {
      switch (message.type) {
        case "START_GIVEAWAY":
          setText("msg received..");
          break;
        default:
          break;
      }
    });
   }, []);

  const onClick = () => {
    //chrome.runtime.sendMessage({ type: "TOGGLE_SNOW", snowing: !snowing });
    chrome.runtime.sendMessage({ type: "START_GIVEAWAY"});
  };

  return (
    <div className="buttonContainer">
      <button className="snowButton" onClick={onClick}>
        {snowing ? "Disable the snow 🥶" : "Let it snow! ❄️"}
      </button>
      { text  }
    </div>
  );
};