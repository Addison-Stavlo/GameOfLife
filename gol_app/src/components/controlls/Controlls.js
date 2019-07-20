import React from "react";
import styled from "styled-components";

export default function Controls(props) {
  return (
    <Controller>
      <button onClick={props.isRunning ? null : props.calcNextGen}>
        Next Gen
      </button>
      <button onClick={props.isRunning ? null : props.play}>Play</button>
      <button onClick={props.pause}>Pause</button>
      <button onClick={props.reset}>Reset</button>
    </Controller>
  );
}

const Controller = styled.div`
  width: 600px;
  display: flex;
  justify-content: space-around;
`;
