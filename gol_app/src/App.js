import React from "react";
import "./App.css";
import GameManager from "./components/GameManager";
import TitleText from "./components/headers/TitleText";
import Description from "./components/headers/Description";

function App() {
  return (
    <div className="App">
      <TitleText />
      <Description />
      <GameManager />
    </div>
  );
}

export default App;
