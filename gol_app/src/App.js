import React from "react";
import "./App.css";
import GameManager from "./components/GameManager";
import TitleText from "./components/headers/TitleText";

import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <TitleText />

      <GameManager />
    </div>
  );
}

export default App;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
