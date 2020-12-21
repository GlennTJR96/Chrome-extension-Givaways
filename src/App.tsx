import * as React from "react";
import { Button } from "./components/Button/Button";

import logo from "./logo.svg";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello there! This is a Giveaway Generator..  :D </p>
      </header>

      <Button />
    </div>
  );
};

export default App;