import React from "react";
import styled from "styled-components";

export default function TitleText(props) {
  return (
    <Title>
      <h1>Addie's Cellular Automata</h1>
      <p>(& Conway's Game of Life)</p>
    </Title>
  );
}

const Title = styled.div`
  /* border: 2px solid rgb(70, 70, 70); */
  max-width: 500px;
  margin: 0 auto;
  h1 {
    color: white;
    font-size: 30px;
    margin-bottom: 10px;
  }

  p {
    color: white;
    font-size: 16px;
    margin-bottom: 10px;
  }
`;
