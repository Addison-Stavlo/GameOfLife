import React from "react";
import "./App.css";
import GameManager from "./components/GameManager";
import TitleText from "./components/headers/TitleText";
import Description from "./components/headers/Description";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <TitleText />
      <ContentWrapper>
        <Description />
        <GameManager />
      </ContentWrapper>
    </div>
  );
}

export default App;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* align-items: center; */
`;
