import React from "react";
import styled from "styled-components";

export default function Controls(props) {
  return (
    <Controller>
      <div className="button-holder">
        <button onClick={props.isRunning ? null : props.calcNextGen}>
          Next Gen
        </button>
        <button onClick={props.isRunning ? null : props.play}>Play</button>
        <button onClick={props.pause}>Pause</button>
        <button onClick={props.reset}>Reset</button>
      </div>
      <div className="gameFPS-bar">
        <h3>Game FPS {props.gameFPS}</h3>
        <input
          name="gameFPS"
          type="range"
          min={1}
          max={30}
          value={props.gameFPS}
          onChange={props.handleChange}
        />
      </div>
    </Controller>
  );
}

const Controller = styled.div`
  border: 1px solid white;

  button-holder {
    width: 600px;
    display: flex;
    justify-content: space-around;
  }

  .gameFPS-bar {
    color: white;
    display: flex;
    justify-content: center;
  }
`;
